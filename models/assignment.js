const assignments = [
  {siteId: "0", userEmail: "ashillin@pratt.edu", title: "Chef"},
  {siteId: "1", userEmail: "ashillin@pratt.edu", title: "Tech person"},
  {siteId: "2", userEmail: "ashillin@pratt.edu", title: "Greeter"},
  {siteId: "3", userEmail: "ashillin@pratt.edu", title: "Greeter"}
];

exports.titles = [
  "Chef","Tech person","Greeter"
]

exports.add = (assignment) => {
  assignments.push(assignment);
};

exports.get = (siteId, userEmail) => {
  return assignments.find((assignment) => {
    return assignment.siteId == siteId && assignment.userEmail == userEmail;
  });
};

exports.AllForUser = (userEmail) => {
  return assignments.filter((assignment) => {
    return assignment.userEmail == userEmail;
  });
};

exports.update = (idx, assignment) => {
  assignments[idx] = assignment;
}

exports.upsert = (assignment) => {
  let idx = assignments.findIndex((bu) => {
    return bu.siteId == assignment.siteId &&
           bu.userEmail == assignment.userEmail;
  });
  if (idx == -1) {
    exports.add(assignment);
  } else {
    exports.update(idx,assignment);
  }
}
