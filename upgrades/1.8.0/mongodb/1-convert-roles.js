var now = new Date();

// update memberships type
print("\n\nUpdate existing memberships to add scope");
db.memberships.find().forEach(
  function (membership) {
    var referenceType = membership._id.referenceType;
    var roleScope;
    if (referenceType === "API" || referenceType === "API_GROUP") {
      roleScope = "3:"
    } else if (referenceType === "APPLICATION" || referenceType === "APPLICATION_GROUP") {
      roleScope = "4:"
    }
    print("    - id[" + membership._id.userId + ":" + membership._id.referenceId + ":" + membership._id.referenceType + "]");
    print("        " + membership.type + " -> " + roleScope + membership.type);
    db.memberships.updateOne(
      { _id: membership._id },
      { $set:
        { type: roleScope + membership.type }
      },
      { upsert: true }
    );
  }
);

// create default roles for scope MANAGEMENT and PORTAL
print("\n\nCreate default memberships");
db.users.find().forEach(
  function(user) {
    print("    - user = " + user._id);
    var roles = user.roles;
    if (roles && roles.length > 0) {
      var role = roles[0];

      if (user._id === "admin") {
        role = "ADMIN"
      } else if (role === "API_CONSUMER") {
        role = "USER"
      }
      print("    - role = " + role);
      db.memberships.insert( [
        {
          _id : {
            userId : user._id,
            referenceId : "DEFAULT",
            referenceType : "MANAGEMENT"
          },
          _class : "io.gravitee.repository.mongodb.management.internal.model.MembershipMongo",
          type : "1:" + role,
          createdAt : now,
          updatedAt : now
        },
        {
          _id : {
            userId : user._id,
            referenceId : "DEFAULT",
            referenceType : "PORTAL"
          },
          _class : "io.gravitee.repository.mongodb.management.internal.model.MembershipMongo",
          type : "2:" + role,
          createdAt : now,
          updatedAt : now
        }
      ]);
    }
  }
);

print("\n\n remove old roles for all users");
db.users.update(
  {},
  {$unset: {roles: ""}},
  {multi: true}
);