import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import VolunteerTypes "../types/volunteer";
import TaskTypes "../types/task";
import MatchingLib "../lib/matching";

mixin (
  accessControlState : AccessControl.AccessControlState,
  volunteerProfiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
  tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>
) {
  public query ({ caller }) func getMatchScore(volunteerId : CommonTypes.UserId, taskId : CommonTypes.TaskId) : async Float {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    MatchingLib.getMatchScore(volunteerProfiles, tasks, volunteerId, taskId);
  };

  public query ({ caller }) func getTopVolunteers(taskId : CommonTypes.TaskId, limit : Nat) : async [VolunteerTypes.VolunteerWithScore] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    MatchingLib.getTopVolunteers(volunteerProfiles, tasks, taskId, limit);
  };

  public query ({ caller }) func getRecommendedTasks(volunteerId : CommonTypes.UserId, limit : Nat) : async [TaskTypes.TaskWithScore] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    MatchingLib.getRecommendedTasks(volunteerProfiles, tasks, volunteerId, limit);
  };

  public query ({ caller }) func getMyRecommendedTasks(limit : Nat) : async [TaskTypes.TaskWithScore] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    MatchingLib.getRecommendedTasks(volunteerProfiles, tasks, caller, limit);
  };
};
