import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import TaskTypes "../types/task";
import VolunteerTypes "../types/volunteer";
import NotificationTypes "../types/notification";
import AdminTypes "../types/admin";
import TaskLib "../lib/task";
import NotificationLib "../lib/notification";
import AdminLib "../lib/admin";

mixin (
  accessControlState : AccessControl.AccessControlState,
  tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
  volunteerProfiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
  notifications : Map.Map<CommonTypes.NotificationId, NotificationTypes.Notification>,
  activityLog : List.List<AdminTypes.ActivityLog>,
  nextTaskId : { var value : Nat },
  nextNotificationId : { var value : Nat },
  nextLogId : { var value : Nat }
) {
  public shared ({ caller }) func createTask(input : TaskTypes.TaskInput) : async CommonTypes.TaskId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let now = Time.now();
    let taskId = TaskLib.createTask(tasks, nextTaskId, input, caller, now);
    AdminLib.logActivity(activityLog, nextLogId, caller, "TASK_CREATED", "Task " # debug_show(taskId) # " created.", now);
    taskId;
  };

  public query ({ caller }) func getTask(taskId : CommonTypes.TaskId) : async ?TaskTypes.TaskPublic {
    TaskLib.getTask(tasks, taskId);
  };

  public shared ({ caller }) func updateTask(taskId : CommonTypes.TaskId, input : TaskTypes.TaskInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    TaskLib.updateTask(tasks, taskId, input, caller, Time.now());
  };

  public shared ({ caller }) func deleteTask(taskId : CommonTypes.TaskId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    TaskLib.deleteTask(tasks, taskId, caller);
  };

  public query ({ caller }) func listAllTasks() : async [TaskTypes.TaskPublic] {
    TaskLib.listTasks(tasks);
  };

  public query ({ caller }) func listMyNGOTasks() : async [TaskTypes.TaskPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    TaskLib.listTasksByNGO(tasks, caller);
  };

  public query ({ caller }) func listMyVolunteerTasks() : async [TaskTypes.TaskPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    TaskLib.listTasksByVolunteer(tasks, caller);
  };

  public shared ({ caller }) func assignVolunteer(taskId : CommonTypes.TaskId, volunteerId : CommonTypes.UserId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let now = Time.now();
    let ok = TaskLib.assignVolunteer(tasks, taskId, volunteerId, caller, now);
    if (ok) {
      NotificationLib.createNotification(notifications, nextNotificationId, volunteerId,
        "You have been assigned to task " # debug_show(taskId) # ".", #assignment, now);
      AdminLib.logActivity(activityLog, nextLogId, caller, "VOLUNTEER_ASSIGNED",
        "Volunteer " # debug_show(volunteerId) # " assigned to task " # debug_show(taskId) # ".", now);
    };
    ok;
  };

  public shared ({ caller }) func acceptTask(taskId : CommonTypes.TaskId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Ensure the caller is the assigned volunteer
    switch (tasks.get(taskId)) {
      case null { return false };
      case (?t) {
        switch (t.assignedVolunteer) {
          case (?v) {
            if (not Principal.equal(v, caller)) Runtime.trap("Unauthorized: Not your task");
          };
          case null { Runtime.trap("No volunteer assigned") };
        };
      };
    };
    let now = Time.now();
    let ok = TaskLib.transitionStatus(tasks, taskId, #accepted, caller, now);
    if (ok) {
      switch (tasks.get(taskId)) {
        case (?t) {
          NotificationLib.createNotification(notifications, nextNotificationId, t.createdByNGO,
            "Volunteer accepted task " # debug_show(taskId) # ".", #acceptance, now);
        };
        case null {};
      };
      AdminLib.logActivity(activityLog, nextLogId, caller, "TASK_ACCEPTED",
        "Volunteer accepted task " # debug_show(taskId) # ".", now);
    };
    ok;
  };

  public shared ({ caller }) func rejectTask(taskId : CommonTypes.TaskId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (tasks.get(taskId)) {
      case null { return false };
      case (?t) {
        switch (t.assignedVolunteer) {
          case (?v) {
            if (not Principal.equal(v, caller)) Runtime.trap("Unauthorized: Not your task");
          };
          case null { Runtime.trap("No volunteer assigned") };
        };
      };
    };
    let now = Time.now();
    let ok = TaskLib.transitionStatus(tasks, taskId, #rejected, caller, now);
    if (ok) {
      switch (tasks.get(taskId)) {
        case (?t) {
          NotificationLib.createNotification(notifications, nextNotificationId, t.createdByNGO,
            "Volunteer rejected task " # debug_show(taskId) # ".", #rejection, now);
        };
        case null {};
      };
      AdminLib.logActivity(activityLog, nextLogId, caller, "TASK_REJECTED",
        "Volunteer rejected task " # debug_show(taskId) # ".", now);
    };
    ok;
  };

  public shared ({ caller }) func markTaskCompleted(taskId : CommonTypes.TaskId, proofs : [Storage.ExternalBlob]) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (tasks.get(taskId)) {
      case null { return false };
      case (?t) {
        switch (t.assignedVolunteer) {
          case (?v) {
            if (not Principal.equal(v, caller)) Runtime.trap("Unauthorized: Not your task");
          };
          case null { Runtime.trap("No volunteer assigned") };
        };
      };
    };
    let now = Time.now();
    let ok = TaskLib.addProofUrls(tasks, taskId, proofs, caller, now);
    if (ok) {
      switch (tasks.get(taskId)) {
        case (?t) {
          NotificationLib.createNotification(notifications, nextNotificationId, t.createdByNGO,
            "Task " # debug_show(taskId) # " has been marked completed by the volunteer.", #completion, now);
        };
        case null {};
      };
      AdminLib.logActivity(activityLog, nextLogId, caller, "TASK_COMPLETED",
        "Task " # debug_show(taskId) # " completed by volunteer.", now);
    };
    ok;
  };

  public shared ({ caller }) func verifyTask(taskId : CommonTypes.TaskId, approved : Bool) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Ensure caller is the NGO that created this task
    switch (tasks.get(taskId)) {
      case null { return false };
      case (?t) {
        if (not Principal.equal(t.createdByNGO, caller)) Runtime.trap("Unauthorized: Not your task");
      };
    };
    let newStatus : CommonTypes.TaskStatus = if (approved) #verified else #rejected;
    let now = Time.now();
    let ok = TaskLib.transitionStatus(tasks, taskId, newStatus, caller, now);
    if (ok) {
      switch (tasks.get(taskId)) {
        case (?t) {
          switch (t.assignedVolunteer) {
            case (?v) {
              let msg = if (approved) "Your completion of task " # debug_show(taskId) # " has been verified!"
                        else "Your completion of task " # debug_show(taskId) # " was rejected.";
              let notifType = if (approved) #acceptance else #rejection;
              NotificationLib.createNotification(notifications, nextNotificationId, v, msg, notifType, now);
            };
            case null {};
          };
        };
        case null {};
      };
      AdminLib.logActivity(activityLog, nextLogId, caller, "TASK_VERIFIED",
        "Task " # debug_show(taskId) # " verification: " # debug_show(approved) # ".", now);
    };
    ok;
  };
};
