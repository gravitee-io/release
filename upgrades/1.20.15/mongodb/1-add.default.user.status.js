var count = 0;
db.users.find().forEach(
  function(user) {
    count ++;
    db.users.updateOne({_id: user._id}, {$set: {status: 'ACTIVE'}}, { upsert: true} );
  }
);

print(count + " users updated");