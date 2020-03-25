print('Archived apps migration');
db.applications.find({status: 'ARCHIVED'}).forEach(
    function (application) {
        db.memberships.find({"_id.referenceType": "APPLICATION", "_id.referenceId": application._id}).forEach(
            function (membership) {
                db.users.find({"_id": membership._id.userId}).forEach(
                    function (user) {
                        print("Clean application memberships for the archived app '" + application.name + "' and user '" + user.sourceId + "'");
                        db.memberships.deleteOne(membership);
                    })
            })
    });
