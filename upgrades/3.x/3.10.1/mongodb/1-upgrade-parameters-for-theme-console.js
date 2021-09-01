print('Update default theme logo in parameters');

db.parameters.find({ '_id.key': 'theme.logo', 'value': 'themes/assets/GRAVITEE_LOGO1-01.png' }).forEach(parameter => {
  parameter.value = 'themes/assets/gravitee-logo.svg';
  db.parameters.save(parameter);
  print('Default theme logo has been updated');
});
