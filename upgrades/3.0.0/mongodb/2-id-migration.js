print('IdentityProviders migration');
db.identity_providers.update({}, {$set: {referenceId: "DEFAULT", referenceType: "ENVIRONMENT"}}, false, true);

print('Parameters migration');
db.parameters.update({}, {$set: {referenceId: "DEFAULT", referenceType: "ENVIRONMENT"}}, false, true);


print('Roles migration');
db.roles.update({}, {$set: {referenceId: "DEFAULT", referenceType: "ENVIRONMENT"}}, false, true);


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
            { "_id": page._id; },
            {
                $set: { "referenceId": referenceId, "referenceType": referenceType },
                $unset: { "api": ""};
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
                $unset: { "api": ""};
            }
        );
    }
);