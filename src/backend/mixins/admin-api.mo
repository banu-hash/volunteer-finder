import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import VolunteerTypes "../types/volunteer";
import NGOTypes "../types/ngo";
import TaskTypes "../types/task";
import AdminTypes "../types/admin";
import NotificationTypes "../types/notification";
import AdminLib "../lib/admin";
import VolunteerLib "../lib/volunteer";
import NGOLib "../lib/ngo";

mixin (
  accessControlState : AccessControl.AccessControlState,
  volunteerProfiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
  ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>,
  tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
  notifications : Map.Map<CommonTypes.NotificationId, NotificationTypes.Notification>,
  activityLog : List.List<AdminTypes.ActivityLog>,
  nextNotificationId : { var value : Nat },
  nextLogId : { var value : Nat }
) {
  public query ({ caller }) func getPlatformStats() : async AdminTypes.PlatformStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    AdminLib.getPlatformStats(volunteerProfiles, ngos, tasks);
  };

  public query ({ caller }) func getActivityLog() : async [AdminTypes.ActivityLog] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    AdminLib.getActivityLog(activityLog, 50);
  };

  public query ({ caller }) func listPendingNGOs() : async [NGOTypes.NGOProfilePublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    NGOLib.listPendingNGOs(ngos);
  };

  public shared ({ caller }) func approveNGO(userId : CommonTypes.UserId, approve : Bool) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let now = Time.now();
    let ok = NGOLib.approveNGO(ngos, userId, approve, now);
    if (ok) {
      AdminLib.logActivity(activityLog, nextLogId, caller, "NGO_APPROVED",
        "NGO " # debug_show(userId) # " approval: " # debug_show(approve) # ".", now);
    };
    ok;
  };

  public shared ({ caller }) func deactivateVolunteer(userId : CommonTypes.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    VolunteerLib.deactivate(volunteerProfiles, userId);
    AdminLib.logActivity(activityLog, nextLogId, caller, "VOLUNTEER_DEACTIVATED",
      "Volunteer " # debug_show(userId) # " deactivated.", Time.now());
  };

  public shared ({ caller }) func deactivateNGO(userId : CommonTypes.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    NGOLib.deactivate(ngos, userId);
    AdminLib.logActivity(activityLog, nextLogId, caller, "NGO_DEACTIVATED",
      "NGO " # debug_show(userId) # " deactivated.", Time.now());
  };

  public shared ({ caller }) func assignUserRole(userId : CommonTypes.UserId, role : CommonTypes.UserRole) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    // Map app role to access control role
    let acRole : AccessControl.UserRole = switch (role) {
      case (#superAdmin) #admin;
      case (#ngo) #user;
      case (#volunteer) #user;
    };
    AccessControl.assignRole(accessControlState, caller, userId, acRole);
    AdminLib.logActivity(activityLog, nextLogId, caller, "ROLE_ASSIGNED",
      "Role " # debug_show(role) # " assigned to " # debug_show(userId) # ".", Time.now());
  };
};
