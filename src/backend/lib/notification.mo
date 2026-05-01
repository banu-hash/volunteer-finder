import Map "mo:core/Map";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import NotificationTypes "../types/notification";

module {
  public func toPublic(n : NotificationTypes.Notification) : NotificationTypes.NotificationPublic {
    {
      id = n.id;
      userId = n.userId;
      message = n.message;
      notificationType = n.notificationType;
      read = n.read;
      createdAt = n.createdAt;
    };
  };

  public func createNotification(
    notifications : Map.Map<CommonTypes.NotificationId, NotificationTypes.Notification>,
    nextId : { var value : Nat },
    userId : CommonTypes.UserId,
    message : Text,
    notificationType : CommonTypes.NotificationType,
    now : CommonTypes.Timestamp
  ) : () {
    let id = nextId.value;
    nextId.value += 1;
    let notif : NotificationTypes.Notification = {
      id;
      userId;
      var message;
      notificationType;
      var read = false;
      createdAt = now;
    };
    notifications.add(id, notif);
  };

  public func getNotifications(
    notifications : Map.Map<CommonTypes.NotificationId, NotificationTypes.Notification>,
    userId : CommonTypes.UserId,
    limit : Nat
  ) : [NotificationTypes.NotificationPublic] {
    let userNotifs = notifications.values().filter(func(n : NotificationTypes.Notification) : Bool {
      Principal.equal(n.userId, userId)
    }).map(func(n : NotificationTypes.Notification) : NotificationTypes.NotificationPublic {
      toPublic(n)
    }).toArray();
    // Sort by createdAt descending (newest first)
    let sorted = userNotifs.sort(func(a : NotificationTypes.NotificationPublic, b : NotificationTypes.NotificationPublic) : { #less; #equal; #greater } {
      if (b.createdAt > a.createdAt) #less
      else if (b.createdAt < a.createdAt) #greater
      else #equal
    });
    if (sorted.size() <= limit) sorted
    else sorted.sliceToArray(0, limit);
  };

  public func markRead(
    notifications : Map.Map<CommonTypes.NotificationId, NotificationTypes.Notification>,
    notificationId : CommonTypes.NotificationId,
    caller : CommonTypes.UserId
  ) : Bool {
    switch (notifications.get(notificationId)) {
      case (?n) {
        if (not Principal.equal(n.userId, caller)) { return false };
        n.read := true;
        true;
      };
      case null false;
    };
  };
};
