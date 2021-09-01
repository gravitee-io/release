print('Update events payload');
// Override this variable if you use prefix
const prefix = '';
const events = db.getCollection(`${prefix}events`);

events.find({ 'type': { $in: ['PUBLISH_API', 'UNPUBLISH_API', 'START_API', 'STOP_API'] }, payload: { $exists: true} }).forEach(event => {
  let count = 0;
  const api = JSON.parse(event.payload);
  if (api.environment != null) {
    api.environmentId = api.environment;
    delete api.environment;
    event.payload = JSON.stringify(api);
    events.save(event);
    count++;
  }
  print(`${count} event(s) has been updated`);

});
