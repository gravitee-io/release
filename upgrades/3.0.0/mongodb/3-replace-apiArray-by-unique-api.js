print('Plans migration');
db.plans.find().forEach(
    function(plan) {
        
        var apiId = plan.apis[0];
         
        if(apiId) {
            db.plans.updateOne(
                { _id: plan._id },
                {
                    $set: { api: apiId},
                    $unset: { apis: "" }
                }
            );
        }
        
    }
);