import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "../types/common";
import TaskTypes "../types/task";

module {
  public func toPublic(task : TaskTypes.Task) : TaskTypes.TaskPublic {
    {
      id = task.id;
      title = task.title;
      description = task.description;
      requiredSkills = task.requiredSkills;
      location = task.location;
      deadline = task.deadline;
      priority = task.priority;
      status = task.status;
      createdByNGO = task.createdByNGO;
      assignedVolunteer = task.assignedVolunteer;
      proofUrls = task.proofUrls;
      createdAt = task.createdAt;
      updatedAt = task.updatedAt;
    };
  };

  public func createTask(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    nextId : { var value : Nat },
    input : TaskTypes.TaskInput,
    createdByNGO : CommonTypes.UserId,
    now : CommonTypes.Timestamp
  ) : CommonTypes.TaskId {
    let id = nextId.value;
    nextId.value += 1;
    let task : TaskTypes.Task = {
      id;
      var title = input.title;
      var description = input.description;
      var requiredSkills = input.requiredSkills;
      var location = input.location;
      var deadline = input.deadline;
      var priority = input.priority;
      var status = #pending;
      createdByNGO;
      var assignedVolunteer = null;
      var proofUrls = [];
      createdAt = now;
      var updatedAt = now;
    };
    tasks.add(id, task);
    id;
  };

  public func getTask(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    taskId : CommonTypes.TaskId
  ) : ?TaskTypes.TaskPublic {
    switch (tasks.get(taskId)) {
      case (?t) ?toPublic(t);
      case null null;
    };
  };

  public func updateTask(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    taskId : CommonTypes.TaskId,
    input : TaskTypes.TaskInput,
    callerNGO : CommonTypes.UserId,
    now : CommonTypes.Timestamp
  ) : Bool {
    switch (tasks.get(taskId)) {
      case (?t) {
        if (not Principal.equal(t.createdByNGO, callerNGO)) { return false };
        t.title := input.title;
        t.description := input.description;
        t.requiredSkills := input.requiredSkills;
        t.location := input.location;
        t.deadline := input.deadline;
        t.priority := input.priority;
        t.updatedAt := now;
        true;
      };
      case null false;
    };
  };

  public func deleteTask(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    taskId : CommonTypes.TaskId,
    callerNGO : CommonTypes.UserId
  ) : Bool {
    switch (tasks.get(taskId)) {
      case (?t) {
        if (not Principal.equal(t.createdByNGO, callerNGO)) { return false };
        tasks.remove(taskId);
        true;
      };
      case null false;
    };
  };

  public func listTasks(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>
  ) : [TaskTypes.TaskPublic] {
    tasks.values().map<TaskTypes.Task, TaskTypes.TaskPublic>(
      func(t) { toPublic(t) }
    ).toArray();
  };

  public func listTasksByNGO(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    ngoId : CommonTypes.UserId
  ) : [TaskTypes.TaskPublic] {
    tasks.values().filter(func(t : TaskTypes.Task) : Bool {
      Principal.equal(t.createdByNGO, ngoId)
    }).map<TaskTypes.Task, TaskTypes.TaskPublic>(
      func(t) { toPublic(t) }
    ).toArray();
  };

  public func listTasksByVolunteer(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    volunteerId : CommonTypes.UserId
  ) : [TaskTypes.TaskPublic] {
    tasks.values().filter(func(t : TaskTypes.Task) : Bool {
      switch (t.assignedVolunteer) {
        case (?v) Principal.equal(v, volunteerId);
        case null false;
      }
    }).map<TaskTypes.Task, TaskTypes.TaskPublic>(
      func(t) { toPublic(t) }
    ).toArray();
  };

  public func assignVolunteer(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    taskId : CommonTypes.TaskId,
    volunteerId : CommonTypes.UserId,
    callerNGO : CommonTypes.UserId,
    now : CommonTypes.Timestamp
  ) : Bool {
    switch (tasks.get(taskId)) {
      case (?t) {
        if (not Principal.equal(t.createdByNGO, callerNGO)) { return false };
        t.assignedVolunteer := ?volunteerId;
        t.status := #accepted;
        t.updatedAt := now;
        true;
      };
      case null false;
    };
  };

  public func transitionStatus(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    taskId : CommonTypes.TaskId,
    newStatus : CommonTypes.TaskStatus,
    _caller : CommonTypes.UserId,
    now : CommonTypes.Timestamp
  ) : Bool {
    switch (tasks.get(taskId)) {
      case (?t) {
        t.status := newStatus;
        t.updatedAt := now;
        true;
      };
      case null false;
    };
  };

  public func addProofUrls(
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    taskId : CommonTypes.TaskId,
    proofs : [Storage.ExternalBlob],
    _caller : CommonTypes.UserId,
    now : CommonTypes.Timestamp
  ) : Bool {
    switch (tasks.get(taskId)) {
      case (?t) {
        t.proofUrls := t.proofUrls.concat(proofs);
        t.status := #completed;
        t.updatedAt := now;
        true;
      };
      case null false;
    };
  };
};
