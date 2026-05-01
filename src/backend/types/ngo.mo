import CommonTypes "common";

module {
  public type NGOProfile = {
    id : CommonTypes.UserId;
    var name : Text;
    var description : Text;
    var contactEmail : Text;
    var website : Text;
    var status : CommonTypes.NGOStatus;
    var isActive : Bool;
    createdAt : CommonTypes.Timestamp;
    var updatedAt : CommonTypes.Timestamp;
  };

  public type NGOProfilePublic = {
    id : CommonTypes.UserId;
    name : Text;
    description : Text;
    contactEmail : Text;
    website : Text;
    status : CommonTypes.NGOStatus;
    isActive : Bool;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type NGOProfileInput = {
    name : Text;
    description : Text;
    contactEmail : Text;
    website : Text;
  };
};
