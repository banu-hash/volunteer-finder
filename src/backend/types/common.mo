module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type TaskId = Nat;
  public type NotificationId = Nat;

  public type UserRole = {
    #volunteer;
    #ngo;
    #superAdmin;
  };

  public type NGOStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type Location = {
    lat : Float;
    lng : Float;
    displayName : Text;
  };

  public type TaskStatus = {
    #pending;
    #accepted;
    #completed;
    #verified;
    #rejected;
  };

  public type TaskPriority = {
    #normal;
    #urgent;
  };

  public type NotificationType = {
    #assignment;
    #acceptance;
    #rejection;
    #completion;
    #reminder;
  };
};
