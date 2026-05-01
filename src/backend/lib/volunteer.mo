import Map "mo:core/Map";
import CommonTypes "../types/common";
import VolunteerTypes "../types/volunteer";

module {
  public func toPublic(profile : VolunteerTypes.VolunteerProfile) : VolunteerTypes.VolunteerProfilePublic {
    {
      id = profile.id;
      name = profile.name;
      bio = profile.bio;
      profilePhoto = profile.profilePhoto;
      skills = profile.skills;
      location = profile.location;
      availability = profile.availability;
      isActive = profile.isActive;
      totalTasksCompleted = profile.totalTasksCompleted;
      rating = profile.rating;
      ratingCount = profile.ratingCount;
      createdAt = profile.createdAt;
      updatedAt = profile.updatedAt;
    };
  };

  public func getProfile(
    profiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
    userId : CommonTypes.UserId
  ) : ?VolunteerTypes.VolunteerProfilePublic {
    switch (profiles.get(userId)) {
      case (?p) ?toPublic(p);
      case null null;
    };
  };

  public func upsertProfile(
    profiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
    userId : CommonTypes.UserId,
    input : VolunteerTypes.VolunteerProfileInput,
    now : CommonTypes.Timestamp
  ) : () {
    switch (profiles.get(userId)) {
      case (?existing) {
        existing.name := input.name;
        existing.bio := input.bio;
        existing.profilePhoto := input.profilePhoto;
        existing.skills := input.skills;
        existing.location := input.location;
        existing.availability := input.availability;
        existing.updatedAt := now;
      };
      case null {
        let newProfile : VolunteerTypes.VolunteerProfile = {
          id = userId;
          var name = input.name;
          var bio = input.bio;
          var profilePhoto = input.profilePhoto;
          var skills = input.skills;
          var location = input.location;
          var availability = input.availability;
          var isActive = true;
          var totalTasksCompleted = 0;
          var rating = 0.0;
          var ratingCount = 0;
          createdAt = now;
          var updatedAt = now;
        };
        profiles.add(userId, newProfile);
      };
    };
  };

  public func listVolunteers(
    profiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>
  ) : [VolunteerTypes.VolunteerProfilePublic] {
    profiles.values().map<VolunteerTypes.VolunteerProfile, VolunteerTypes.VolunteerProfilePublic>(
      func(p) { toPublic(p) }
    ).toArray();
  };

  public func filterBySkills(
    profiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
    skills : [Text]
  ) : [VolunteerTypes.VolunteerProfilePublic] {
    profiles.values().filter(func(p : VolunteerTypes.VolunteerProfile) : Bool {
      p.isActive and skills.any(func(s : Text) : Bool {
        p.skills.any(func(vs : Text) : Bool {
          vs == s
        })
      })
    }).map<VolunteerTypes.VolunteerProfile, VolunteerTypes.VolunteerProfilePublic>(
      func(p) { toPublic(p) }
    ).toArray();
  };

  public func deactivate(
    profiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
    userId : CommonTypes.UserId
  ) : () {
    switch (profiles.get(userId)) {
      case (?p) { p.isActive := false };
      case null {};
    };
  };
};
