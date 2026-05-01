import Map "mo:core/Map";
import CommonTypes "../types/common";
import NGOTypes "../types/ngo";

module {
  public func toPublic(ngo : NGOTypes.NGOProfile) : NGOTypes.NGOProfilePublic {
    {
      id = ngo.id;
      name = ngo.name;
      description = ngo.description;
      contactEmail = ngo.contactEmail;
      website = ngo.website;
      status = ngo.status;
      isActive = ngo.isActive;
      createdAt = ngo.createdAt;
      updatedAt = ngo.updatedAt;
    };
  };

  public func registerNGO(
    ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>,
    userId : CommonTypes.UserId,
    input : NGOTypes.NGOProfileInput,
    now : CommonTypes.Timestamp
  ) : () {
    let profile : NGOTypes.NGOProfile = {
      id = userId;
      var name = input.name;
      var description = input.description;
      var contactEmail = input.contactEmail;
      var website = input.website;
      var status = #pending;
      var isActive = true;
      createdAt = now;
      var updatedAt = now;
    };
    ngos.add(userId, profile);
  };

  public func getNGO(
    ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>,
    userId : CommonTypes.UserId
  ) : ?NGOTypes.NGOProfilePublic {
    switch (ngos.get(userId)) {
      case (?n) ?toPublic(n);
      case null null;
    };
  };

  public func updateNGO(
    ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>,
    userId : CommonTypes.UserId,
    input : NGOTypes.NGOProfileInput,
    now : CommonTypes.Timestamp
  ) : () {
    switch (ngos.get(userId)) {
      case (?n) {
        n.name := input.name;
        n.description := input.description;
        n.contactEmail := input.contactEmail;
        n.website := input.website;
        n.updatedAt := now;
      };
      case null {};
    };
  };

  public func approveNGO(
    ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>,
    userId : CommonTypes.UserId,
    approve : Bool,
    now : CommonTypes.Timestamp
  ) : Bool {
    switch (ngos.get(userId)) {
      case (?n) {
        n.status := if (approve) #approved else #rejected;
        n.updatedAt := now;
        true;
      };
      case null false;
    };
  };

  public func listNGOs(
    ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>
  ) : [NGOTypes.NGOProfilePublic] {
    ngos.values().map<NGOTypes.NGOProfile, NGOTypes.NGOProfilePublic>(
      func(n) { toPublic(n) }
    ).toArray();
  };

  public func listPendingNGOs(
    ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>
  ) : [NGOTypes.NGOProfilePublic] {
    ngos.values().filter(func(n : NGOTypes.NGOProfile) : Bool {
      switch (n.status) { case (#pending) true; case _ false }
    }).map<NGOTypes.NGOProfile, NGOTypes.NGOProfilePublic>(
      func(n) { toPublic(n) }
    ).toArray();
  };

  public func deactivate(
    ngos : Map.Map<CommonTypes.UserId, NGOTypes.NGOProfile>,
    userId : CommonTypes.UserId
  ) : () {
    switch (ngos.get(userId)) {
      case (?n) { n.isActive := false };
      case null {};
    };
  };
};
