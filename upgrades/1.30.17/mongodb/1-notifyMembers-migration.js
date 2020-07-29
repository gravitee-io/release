
print('Groups migration');
db.groups.update(
    { "notifyMembers": { "$exists": false } },
    { "$set" : { "notifyMembers" : true } },
    { multi: true }
);

print('APIs migration');
db.apis.update(
    { "notifyMembers": { "$exists": false } },
    { "$set" : { "notifyMembers" : true } },
    { multi: true }
);

print('Applications migration');
db.applications.update(
    { "notifyMembers": { "$exists": false } },
    { "$set" : { "notifyMembers" : true } },
    { multi: true }
);