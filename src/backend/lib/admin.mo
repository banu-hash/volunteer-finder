import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import CommonTypes "../types/common";
import AdminTypes "../types/admin";
import VolunteerTypes "../types/volunteer";
import NGOTypes "../types/ngo";
import TaskTypes "../types/task";

module {
  public func getPlatformStats(
    volunteers : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
    ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>,
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>
  ) : AdminTypes.PlatformStats {
    let totalVolunteers = volunteers.size();
    let totalNGOs = ngos.size();
    let totalTasks = tasks.size();
    let completedTasks = tasks.values().filter(func(t : TaskTypes.Task) : Bool {
      switch (t.status) { case (#completed) true; case _ false }
    }).size();
    let verifiedTasks = tasks.values().filter(func(t : TaskTypes.Task) : Bool {
      switch (t.status) { case (#verified) true; case _ false }
    }).size();
    let pendingNGOs = ngos.values().filter(func(n : NGOTypes.NGOProfile) : Bool {
      switch (n.status) { case (#pending) true; case _ false }
    }).size();
    let completionRate : Float = if (totalTasks == 0) 0.0
      else (completedTasks + verifiedTasks).toFloat() / totalTasks.toFloat() * 100.0;
    {
      totalVolunteers;
      totalNGOs;
      totalTasks;
      completedTasks;
      verifiedTasks;
      completionRate;
      pendingNGOs;
    };
  };

  public func logActivity(
    activityLog : List.List<AdminTypes.ActivityLog>,
    nextId : { var value : Nat },
    actorId : CommonTypes.UserId,
    action : Text,
    details : Text,
    now : CommonTypes.Timestamp
  ) : () {
    let id = nextId.value;
    nextId.value += 1;
    let entry : AdminTypes.ActivityLog = {
      id;
      userId = actorId;
      action;
      details;
      timestamp = now;
    };
    activityLog.add(entry);
  };

  public func getActivityLog(
    activityLog : List.List<AdminTypes.ActivityLog>,
    limit : Nat
  ) : [AdminTypes.ActivityLog] {
    let all = activityLog.toArray();
    let n = all.size();
    if (n <= limit) all
    else all.sliceToArray(n - limit, n);
  };
};
