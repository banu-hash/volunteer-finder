import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import NGOTypes "../types/ngo";
import AdminTypes "../types/admin";
import NGOLib "../lib/ngo";
import AdminLib "../lib/admin";

mixin (
  accessControlState : AccessControl.AccessControlState,
  ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>,
  activityLog : List.List<AdminTypes.ActivityLog>,
  nextLogId : { var value : Nat }
) {
  public query ({ caller }) func getMyNGOProfile() : async ?NGOTypes.NGOProfilePublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    NGOLib.getNGO(ngos, caller);
  };

  public shared ({ caller }) func registerNGO(input : NGOTypes.NGOProfileInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let now = Time.now();
    NGOLib.registerNGO(ngos, caller, input, now);
    AdminLib.logActivity(activityLog, nextLogId, caller, "NGO_REGISTERED",
      "NGO '" # input.name # "' registered.", now);
  };

  public shared ({ caller }) func updateMyNGOProfile(input : NGOTypes.NGOProfileInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    NGOLib.updateNGO(ngos, caller, input, Time.now());
  };

  public query ({ caller }) func getNGOProfile(userId : CommonTypes.UserId) : async ?NGOTypes.NGOProfilePublic {
    NGOLib.getNGO(ngos, userId);
  };

  public query ({ caller }) func listNGOs() : async [NGOTypes.NGOProfilePublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    NGOLib.listNGOs(ngos);
  };
};
