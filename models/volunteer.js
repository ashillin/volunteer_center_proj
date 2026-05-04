const volunteers = [
    {firstName: "James", lastName: "S. A. Corey"},
    {firstName: "Craig", lastName: "Alanson"}, 
    {firstName: "Cixin", lastName: "Liu"},
  ];

exports.add = (volunteer) => {
    volunteers.push(volunteer);
};

  exports.all = volunteers;