const db = require('../database')

exports.all = async () => {
 const { rows } = await db.getPool().query("select * from volunteers order by id");
 return db.camelize(rows);
};

exports.add = async (volunteer) => {
  const { rows } = await db.getPool().query(
    "INSERT INTO volunteers (first_name, last_name, volunteer_status) VALUES ($1, $2, $3) RETURNING *;",
    [volunteer.firstName, volunteer.lastName, true]
  );
  return db.camelize(rows)[0]; // ✅ return the new volunteer with its id
};

exports.get = async (id) => {
 const { rows } = await db.getPool().query("select * from volunteers where id = $1", [id])
 return db.camelize(rows)[0]
};

exports.upsert = async (volunteer) => {
  if (volunteer.id) {
    exports.update(volunteer);
  } else {
    await exports.add(volunteer);
  }
};

exports.update = async (volunteer) => {
 await db.getPool().query("update volunteers set first_name = $1, last_name = $2, volunteer_status = $3 where id = $4;",
   [volunteer.firstName, volunteer.lastName, volunteer.volunteerStatus === "true", volunteer.id]);
};

exports.allForSite = async (site) => {
  const { rows } = await db.getPool().query(`
    select volunteers.*, roles.id as role_id, roles.role_name from volunteers
    JOIN assignments on assignments.volunteer_id = volunteers.id
    JOIN roles on roles.id = assignments.role_id
    where assignments.site_id = $1;`, [site.id]);
  return db.camelize(rows);
};

exports.allForVolunteer = async (volunteer) => {
  const { rows } = await db.getPool().query(`
    select sites.* from sites
    JOIN assignments on assignments.site_id = sites.id
    where assignments.volunteer_id = $1;`, [volunteer.id]);
  return db.camelize(rows);
};