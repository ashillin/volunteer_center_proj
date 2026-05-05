const roles = [
    {title: "Chef", description: "Prepares food for the site."},
    {title: "Tech person", description: "In charge of making sure technology at the site is working as intended."},
    {title: "Greeter", description: "Greets people that walk up to the site and explains the site's purpose to them."}
];

exports.add = (role) => {
    roles.push(role);
};

exports.get = (idx) => {
  return roles[idx];
};

exports.upsert = (role) => {
  if (role.id) {
    exports.update(role);
  } else {
    exports.add(role);
  }
};

exports.update = (role) => {
  role.id = parseInt(role.id);
  roles[role.id] = role;
};

  exports.all = roles;