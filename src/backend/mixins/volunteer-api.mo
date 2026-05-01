import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import VolunteerTypes "../types/volunteer";
import VolunteerLib "../lib/volunteer";

mixin (
  accessControlState : AccessControl.AccessControlState,
  volunteerProfiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>
) {
  public query ({ caller }) func getMyVolunteerProfile() : async ?VolunteerTypes.VolunteerProfilePublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VolunteerLib.getProfile(volunteerProfiles, caller);
  };

  public shared ({ caller }) func saveMyVolunteerProfile(input : VolunteerTypes.VolunteerProfileInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VolunteerLib.upsertProfile(volunteerProfiles, caller, input, Time.now());
  };

  public query ({ caller }) func getVolunteerProfile(userId : CommonTypes.UserId) : async ?VolunteerTypes.VolunteerProfilePublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VolunteerLib.getProfile(volunteerProfiles, userId);
  };

  public query ({ caller }) func listVolunteers() : async [VolunteerTypes.VolunteerProfilePublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VolunteerLib.listVolunteers(volunteerProfiles);
  };

  public query ({ caller }) func filterVolunteersBySkills(skills : [Text]) : async [VolunteerTypes.VolunteerProfilePublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VolunteerLib.filterBySkills(volunteerProfiles, skills);
  };
};
