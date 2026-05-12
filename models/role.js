const db = require('../database')

exports.all = async () => {
 const { rows } = await db.getPool().query("select * from roles order by id");
 return db.camelize(rows);
};

exports.add = async (role) => {
 await db.getPool().query("insert into roles (role_name, description) values ($1, $2);",
   [role.roleName, role.description]);
};

exports.get = async (id) => {
 const { rows } = await db.getPool().query("select * from roles where id = $1", [id])
 return db.camelize(rows)[0]
};

exports.upsert = async (role) => {
  if (role.id) {
    await exports.update(role);
  } else {
    await exports.add(role);
  }
};

exports.update = async (role) => {
 await db.getPool().query("update roles set role_name = $1, description = $2 where id = $3;",
   [role.roleName, role.description, role.id]);
};