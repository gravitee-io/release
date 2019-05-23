print('Apiheaders migration');
db.apiheaders.update({}, {$set: {"environment": "DEFAULT"}}, false, true);

print('Apis migration');
db.apis.update({}, {$set: {"environment": "DEFAULT"}}, false, true);

print('Applications migration');
db.applications.update({}, {$set: {"environment": "DEFAULT"}}, false, true);

print('Commands migration');
db.commands.update({}, {$set: {"environment": "DEFAULT"}}, false, true);

print('Dictionaries migration');
db.dictionaries.update({}, {$set: {"environment": "DEFAULT"}}, false, true);

print('Events migration');
db.events.update({}, {$set: {"environment": "DEFAULT"}}, false, true);

print('Entrypoints migration');
db.entrypoints.update({}, {$set: {"environment": "DEFAULT"}}, false, true);

print('Groups migration');
db.groups.update({}, {$set: {"environment": "DEFAULT"}}, false, true);

print('Users migration');
db.users.update({}, {$set: {"environment": "DEFAULT"}}, false, true);

print('Views migration');
db.views.update({}, {$set: {"environment": "DEFAULT"}}, false, true);
