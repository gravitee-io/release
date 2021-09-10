print('Update the `API_ID` property to `API_DEBUG_ID` for events of type `DEBUG_API`');
// Override this variable if you use prefix
const prefix = '';

const events = db.getCollection(`${prefix}events`);

events.find({type: "DEBUG_API"}).forEach((event) => {
  if(event.properties.api_id) {
    event.properties.api_debug_id = event.properties.api_id;
    delete event.properties.api_id;
    events.save(event);
  }
});

print('`DEBUG_API` has been updated');
