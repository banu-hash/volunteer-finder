import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import NotificationTypes "../types/notification";
import NotificationLib "../lib/notification";

mixin (
  accessControlState : AccessControl.AccessControlState,
  notifications : Map.Map<CommonTypes.NotificationId, NotificationTypes.Notification>,
  nextNotificationId : { var value : Nat }
) {
  public query ({ caller }) func getMyNotifications() : async [NotificationTypes.NotificationPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    NotificationLib.getNotifications(notifications, caller, 20);
  };

  public shared ({ caller }) func markNotificationRead(notificationId : CommonTypes.NotificationId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    NotificationLib.markRead(notifications, notificationId, caller);
  };

  public shared ({ caller }) func markAllNotificationsRead() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    notifications.forEach(func(id : CommonTypes.NotificationId, n : NotificationTypes.Notification) {
      if (Principal.equal(n.userId, caller)) {
        n.read := true;
      };
    });
  };
};
