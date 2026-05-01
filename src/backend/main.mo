import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import CommonTypes "types/common";
import VolunteerTypes "types/volunteer";
import NGOTypes "types/ngo";
import TaskTypes "types/task";
import NotificationTypes "types/notification";
import AdminTypes "types/admin";
import VolunteerApi "mixins/volunteer-api";
import TaskApi "mixins/task-api";
import MatchingApi "mixins/matching-api";
import NotificationApi "mixins/notification-api";
import NGOApi "mixins/ngo-api";
import AdminApi "mixins/admin-api";
import SeedLib "lib/seed";

actor {
  // Auth
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // State
  let volunteerProfiles = Map.empty<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>();
  let ngoProfiles = Map.empty<CommonTypes.UserId, NGOTypes.NGOProfile>();
  let tasks = Map.empty<CommonTypes.TaskId, TaskTypes.Task>();
  let notifications = Map.empty<CommonTypes.NotificationId, NotificationTypes.Notification>();
  let activityLog = List.empty<AdminTypes.ActivityLog>();

  // Counters
  let taskIdCounter = { var value : Nat = 0 };
  let notificationIdCounter = { var value : Nat = 0 };
  let logIdCounter = { var value : Nat = 0 };

  // Seed sample data on first run.
  // roleAssigner writes directly to accessControlState.userRoles bypassing the admin guard
  // (safe here since we are in actor initialisation, not a public call).
  SeedLib.seedData(
    volunteerProfiles,
    ngoProfiles,
    tasks,
    notifications,
    activityLog,
    taskIdCounter,
    notificationIdCounter,
    logIdCounter,
    func(userId : CommonTypes.UserId, role : CommonTypes.UserRole) {
      let acRole : AccessControl.UserRole = switch (role) {
        case (#superAdmin) #admin;
        case (#ngo) #user;
        case (#volunteer) #user;
      };
      accessControlState.userRoles.add(userId, acRole);
      if (acRole == #admin and not accessControlState.adminAssigned) {
        accessControlState.adminAssigned := true;
      };
    }
  );

  // Mixins
  include VolunteerApi(accessControlState, volunteerProfiles);
  include TaskApi(accessControlState, tasks, volunteerProfiles, notifications, activityLog, taskIdCounter, notificationIdCounter, logIdCounter);
  include MatchingApi(accessControlState, volunteerProfiles, tasks);
  include NotificationApi(accessControlState, notifications, notificationIdCounter);
  include NGOApi(accessControlState, ngoProfiles, activityLog, logIdCounter);
  include AdminApi(accessControlState, volunteerProfiles, ngoProfiles, tasks, notifications, activityLog, notificationIdCounter, logIdCounter);
};
