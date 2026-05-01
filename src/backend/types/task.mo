import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "common";

module {
  public type Task = {
    id : CommonTypes.TaskId;
    var title : Text;
    var description : Text;
    var requiredSkills : [Text];
    var location : ?CommonTypes.Location;
    var deadline : CommonTypes.Timestamp;
    var priority : CommonTypes.TaskPriority;
    var status : CommonTypes.TaskStatus;
    createdByNGO : CommonTypes.UserId;
    var assignedVolunteer : ?CommonTypes.UserId;
    var proofUrls : [Storage.ExternalBlob];
    createdAt : CommonTypes.Timestamp;
    var updatedAt : CommonTypes.Timestamp;
  };

  public type TaskPublic = {
    id : CommonTypes.TaskId;
    title : Text;
    description : Text;
    requiredSkills : [Text];
    location : ?CommonTypes.Location;
    deadline : CommonTypes.Timestamp;
    priority : CommonTypes.TaskPriority;
    status : CommonTypes.TaskStatus;
    createdByNGO : CommonTypes.UserId;
    assignedVolunteer : ?CommonTypes.UserId;
    proofUrls : [Storage.ExternalBlob];
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type TaskInput = {
    title : Text;
    description : Text;
    requiredSkills : [Text];
    location : ?CommonTypes.Location;
    deadline : CommonTypes.Timestamp;
    priority : CommonTypes.TaskPriority;
  };

  public type TaskWithScore = {
    task : TaskPublic;
    matchScore : Float;
  };
};
