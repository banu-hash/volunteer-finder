import CommonTypes "common";

module {
  public type Notification = {
    id : CommonTypes.NotificationId;
    userId : CommonTypes.UserId;
    var message : Text;
    notificationType : CommonTypes.NotificationType;
    var read : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type NotificationPublic = {
    id : CommonTypes.NotificationId;
    userId : CommonTypes.UserId;
    message : Text;
    notificationType : CommonTypes.NotificationType;
    read : Bool;
    createdAt : CommonTypes.Timestamp;
  };
};
