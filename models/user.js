const db = require('../database');
var crypto = require('crypto');

const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};

const encryptPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex');
};

exports.add = async (user) => {
  let salt = createSalt();
  let encryptedPassword = encryptPassword(user.password, salt)
  return db.getPool()
    .query("INSERT INTO users(email, name, salt, password) VALUES($1, $2, $3, $4) RETURNING *",
      [user.email, user.name, salt, encryptedPassword])
};

// exports.add = (user) => {
//     users.push(user);
// };
exports.getByEmail = async (email) => {
  const { rows } = await db.getPool().query("select * from users where email = $1", [email])
  return db.camelize(rows)[0]
}
;

exports.login = async (login) => {
  let user = await exports.getByEmail(login.email);
  if (!user) {
    return null;
  }
  let encryptedPassword = encryptPassword(login.password, user.salt);
  if (user.password === encryptedPassword) {
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

// exports.get = (idx) => {
//   return users[idx];
// };

// exports.upsert = (user) => {
//   if (user.id) {
//     exports.update(user);
//   } else {
//     exports.add(user);
//   }
// };

// exports.update = (user) => {
//   user.id = parseInt(user.id);
//   users[user.id] = user;
// };

  // exports.all = users;