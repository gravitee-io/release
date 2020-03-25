print('IdentityProviders migration');
db.identity_providers.update({}, {$set: {referenceId: "DEFAULT", referenceType: "ENVIRONMENT"}}, false, true);

print('Parameters migration');
db.parameters.update({}, {$set: {referenceId: "DEFAULT", referenceType: "ENVIRONMENT"}}, false, true);

print('Users migration');
db.users.update({}, {$set: {referenceId: "DEFAULT", referenceType: "ORGANIZATION"}}, false, true);

print('Pages migration');
db.pages.find().forEach(
    function(page) {
        var referenceId ='';
        var referenceType = '';

        if(page.api) {
            referenceId = page.api;
            referenceType = "API";
        } else {
            referenceId = "DEFAULT";
            referenceType = "ENVIRONMENT";
        }
        
        db.pages.updateOne(
            { "_id": page._id },
            {
                $set: { "referenceId": referenceId, "referenceType": referenceType },
                $unset: { "api": ""}
            }
        );
    }
);

print('Rating migration');
db.rating.find().forEach(
    function(rating) {
        var referenceId ='';
        var referenceType = '';
        
        if(rating.api) {
            referenceId = rating.api;
            referenceType = "API";
        } else {
            referenceId = "DEFAULT";
            referenceType = "ENVIRONMENT";
        }
        
        db.rating.updateOne(
            { "_id": rating._id },
            {
                $set: { "referenceId": referenceId, "referenceType": referenceType },
                $unset: { "api": ""}
            }
        );
    }
);

print('Roles migration');
db.roles.find().forEach(
    function(role) {
        const oldId = role._id;
        role._id = { 
            "scope": role._id.scope, 
            "name": role._id.name,
            "referenceId": "DEFAULT",
            "referenceType": "ORGANIZATION"
        }
        db.roles.remove({ "_id" : oldId });
        db.roles.insert(role);
    }
);

print('Views migration');
db.views.find().forEach(
    function(view) {
        const oldId = view._id;
        view._id = {
            "_id": view._id,
            "environment": "DEFAULT"
        }
        db.views.remove({ "_id": oldId });
        db.views.insert(view);
    }
);