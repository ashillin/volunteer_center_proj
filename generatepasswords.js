var crypto = require('crypto');

const createSalt = () => crypto.randomBytes(16).toString('hex');
const encryptPassword = (password, salt) => 
  crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex');

const users = [
  { firstName: 'Frank', lastName: 'Herbert', email: 'frank@test.com', password: 'password' },
  { firstName: 'Yoshihiro', lastName: 'Togashi', email: 'yoshi@test.com', password: 'password' },
  { firstName: 'Akutami', lastName: 'Gege', email: 'akutami@test.com', password: 'password' },
];

users.forEach(user => {
  let salt = createSalt();
  let encryptedPassword = encryptPassword(user.password, salt);
  console.log(`insert into users (first_name, last_name, email, salt, password, volunteer_id) values('${user.firstName}', '${user.lastName}', '${user.email}', '${salt}', '${encryptedPassword}', ${users.indexOf(user) + 1});`);
});