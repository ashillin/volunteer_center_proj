const users = [
  {email: "ashillin@pratt.edu", name: "Andrew", password: "password"}
];
var crypto = require('crypto');

const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};

const encryptPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex');
};

exports.add = (user) => {
  let salt = createSalt();
  let new_user = {
    email: user.email,
    name: user.name,
    salt: salt,
    encryptedPassword: encryptPassword(user.password, salt)
  }
  users.push(new_user);
};

exports.add = (user) => {
    users.push(user);
};
exports.getByEmail = (email) => {
  return users.find((user) => user.email === email);
};

exports.login = (login) => {
  let user = exports.getByEmail(login.email);
  if (!user) {
    return null;
  }
  let encryptedPassword = encryptPassword(login.password, user.salt);
  if (user.encryptedPassword === encryptedPassword) {
    return user;
  }
  return null;
};


exports.login = (login) => {
  let user = exports.getByEmail(login.email);
  if (user && user.password === login.password) {
    return user;
  }
  return null;
};

exports.get = (idx) => {
  return users[idx];
};

exports.upsert = (user) => {
  if (user.id) {
    exports.update(user);
  } else {
    exports.add(user);
  }
};

exports.update = (user) => {
  user.id = parseInt(user.id);
  users[user.id] = user;
};

  exports.all = users;