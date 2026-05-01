import CommonTypes "common";

module {
  public type PlatformStats = {
    totalVolunteers : Nat;
    totalNGOs : Nat;
    totalTasks : Nat;
    completedTasks : Nat;
    verifiedTasks : Nat;
    completionRate : Float;
    pendingNGOs : Nat;
  };

  public type ActivityLog = {
    id : Nat;
    userId : CommonTypes.UserId;
    action : Text;
    details : Text;
    timestamp : CommonTypes.Timestamp;
  };
};
