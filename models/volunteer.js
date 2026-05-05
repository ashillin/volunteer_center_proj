const volunteers = [
    {firstName: "James", lastName: "S. A. Corey"},
    {firstName: "Craig", lastName: "Alanson"}, 
    {firstName: "Cixin", lastName: "Liu"},
  ];

exports.add = (volunteer) => {
    volunteers.push(volunteer);
};

exports.get = (idx) => {
  return volunteers[idx];
};

exports.upsert = (volunteer) => {
  if (volunteer.id) {
    exports.update(volunteer);
  } else {
    exports.add(volunteer);
  }
};

exports.update = (volunteer) => {
  volunteer.id = parseInt(volunteer.id);
  volunteers[volunteer.id] = volunteer;
};

  exports.all = volunteers;