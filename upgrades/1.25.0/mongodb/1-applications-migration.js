
print('Applications migration');
db.applications.find().forEach(
    function (application) {
        print("    update the application");

        if (application.type) {
            db.applications.updateOne(
                { _id: application._id },
                {
                    $set: { "metadata.type" : application.type },
                    $unset: { type: "" }
                });
        }

        if (application.clientId) {
            db.applications.updateOne(
                { _id: application._id },
                {
                    $set: { "metadata.client_id" : application.clientId },
                    $unset: { clientId: "" }
                });
        }

        db.applications.updateOne(
            { _id: application._id },
            { $set: { type: 'SIMPLE' }});
    }
);