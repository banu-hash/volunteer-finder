import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "common";

module {
  public type VolunteerProfile = {
    id : CommonTypes.UserId;
    var name : Text;
    var bio : Text;
    var profilePhoto : ?Storage.ExternalBlob;
    var skills : [Text];
    var location : ?CommonTypes.Location;
    var availability : Text;
    var isActive : Bool;
    var totalTasksCompleted : Nat;
    var rating : Float;
    var ratingCount : Nat;
    createdAt : CommonTypes.Timestamp;
    var updatedAt : CommonTypes.Timestamp;
  };

  public type VolunteerProfilePublic = {
    id : CommonTypes.UserId;
    name : Text;
    bio : Text;
    profilePhoto : ?Storage.ExternalBlob;
    skills : [Text];
    location : ?CommonTypes.Location;
    availability : Text;
    isActive : Bool;
    totalTasksCompleted : Nat;
    rating : Float;
    ratingCount : Nat;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type VolunteerProfileInput = {
    name : Text;
    bio : Text;
    profilePhoto : ?Storage.ExternalBlob;
    skills : [Text];
    location : ?CommonTypes.Location;
    availability : Text;
  };

  public type VolunteerWithScore = {
    profile : VolunteerProfilePublic;
    matchScore : Float;
  };
};
