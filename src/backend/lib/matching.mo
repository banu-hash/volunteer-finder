import Map "mo:core/Map";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import CommonTypes "../types/common";
import VolunteerTypes "../types/volunteer";
import TaskTypes "../types/task";

module {
  // Haversine formula to compute distance between two lat/lng points in km
  public func distanceKm(a : CommonTypes.Location, b : CommonTypes.Location) : Float {
    let r : Float = 6371.0; // Earth radius in km
    let dLat = (b.lat - a.lat) * Float.pi / 180.0;
    let dLng = (b.lng - a.lng) * Float.pi / 180.0;
    let sinDLat = Float.sin(dLat / 2.0);
    let sinDLng = Float.sin(dLng / 2.0);
    let cosA = Float.cos(a.lat * Float.pi / 180.0);
    let cosB = Float.cos(b.lat * Float.pi / 180.0);
    let h = sinDLat * sinDLat + cosA * cosB * sinDLng * sinDLng;
    let sqrtH = Float.sqrt(h);
    let clampedSqrt = if (sqrtH > 1.0) 1.0 else sqrtH;
    2.0 * r * Float.arcsin(clampedSqrt);
  };

  // 0.0 (far) to 100.0 (same location)
  public func distanceProximityScore(distKm : Float, maxRadiusKm : Float) : Float {
    if (distKm >= maxRadiusKm) 0.0
    else (1.0 - distKm / maxRadiusKm) * 100.0;
  };

  // Fraction of required skills matched, scaled to 100.0
  public func skillsRelevance(volunteerSkills : [Text], requiredSkills : [Text]) : Float {
    if (requiredSkills.size() == 0) { return 100.0 };
    let matched = requiredSkills.filter(func(rs : Text) : Bool {
      volunteerSkills.any(func(vs : Text) : Bool { vs == rs })
    });
    let score = matched.size().toFloat() / requiredSkills.size().toFloat() * 100.0;
    score;
  };

  // Combined score: 60% skills relevance + 40% distance proximity
  public func matchScore(
    volunteer : VolunteerTypes.VolunteerProfile,
    task : TaskTypes.Task,
    maxRadiusKm : Float
  ) : Float {
    let skillScore = skillsRelevance(volunteer.skills, task.requiredSkills);
    let distScore = switch (volunteer.location, task.location) {
      case (?vLoc, ?tLoc) distanceProximityScore(distanceKm(vLoc, tLoc), maxRadiusKm);
      case _ 50.0; // neutral when location unknown
    };
    skillScore * 0.6 + distScore * 0.4;
  };

  public func getMatchScore(
    profiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    volunteerId : CommonTypes.UserId,
    taskId : CommonTypes.TaskId
  ) : Float {
    switch (profiles.get(volunteerId), tasks.get(taskId)) {
      case (?v, ?t) matchScore(v, t, 50.0);
      case _ 0.0;
    };
  };

  public func getTopVolunteers(
    profiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    taskId : CommonTypes.TaskId,
    limit : Nat
  ) : [VolunteerTypes.VolunteerWithScore] {
    switch (tasks.get(taskId)) {
      case null [];
      case (?task) {
        let scored = profiles.values().filter(func(v : VolunteerTypes.VolunteerProfile) : Bool {
          v.isActive
        }).map(func(v : VolunteerTypes.VolunteerProfile) : VolunteerTypes.VolunteerWithScore {
          let score = matchScore(v, task, 50.0);
          let pub : VolunteerTypes.VolunteerProfilePublic = {
            id = v.id;
            name = v.name;
            bio = v.bio;
            profilePhoto = v.profilePhoto;
            skills = v.skills;
            location = v.location;
            availability = v.availability;
            isActive = v.isActive;
            totalTasksCompleted = v.totalTasksCompleted;
            rating = v.rating;
            ratingCount = v.ratingCount;
            createdAt = v.createdAt;
            updatedAt = v.updatedAt;
          };
          { profile = pub; matchScore = score }
        }).toArray();
        let sorted = scored.sort(func(a : VolunteerTypes.VolunteerWithScore, b : VolunteerTypes.VolunteerWithScore) : { #less; #equal; #greater } {
          if (b.matchScore > a.matchScore) #less
          else if (b.matchScore < a.matchScore) #greater
          else #equal
        });
        if (sorted.size() <= limit) sorted
        else sorted.sliceToArray(0, limit);
      };
    };
  };

  public func getRecommendedTasks(
    profiles : Map.Map<CommonTypes.UserId, VolunteerTypes.VolunteerProfile>,
    tasks : Map.Map<CommonTypes.TaskId, TaskTypes.Task>,
    volunteerId : CommonTypes.UserId,
    limit : Nat
  ) : [TaskTypes.TaskWithScore] {
    switch (profiles.get(volunteerId)) {
      case null [];
      case (?volunteer) {
        let scored = tasks.values().filter(func(t : TaskTypes.Task) : Bool {
          switch (t.status) { case (#pending) true; case _ false }
        }).map(func(t : TaskTypes.Task) : TaskTypes.TaskWithScore {
          let score = matchScore(volunteer, t, 50.0);
          let pub : TaskTypes.TaskPublic = {
            id = t.id;
            title = t.title;
            description = t.description;
            requiredSkills = t.requiredSkills;
            location = t.location;
            deadline = t.deadline;
            priority = t.priority;
            status = t.status;
            createdByNGO = t.createdByNGO;
            assignedVolunteer = t.assignedVolunteer;
            proofUrls = t.proofUrls;
            createdAt = t.createdAt;
            updatedAt = t.updatedAt;
          };
          { task = pub; matchScore = score }
        }).toArray();
        let sorted = scored.sort(func(a : TaskTypes.TaskWithScore, b : TaskTypes.TaskWithScore) : { #less; #equal; #greater } {
          if (b.matchScore > a.matchScore) #less
          else if (b.matchScore < a.matchScore) #greater
          else #equal
        });
        if (sorted.size() <= limit) sorted
        else sorted.sliceToArray(0, limit);
      };
    };
  };
};
