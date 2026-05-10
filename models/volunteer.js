const db = require('../database')

exports.all = async () => {
 const { rows } = await db.getPool().query("select * from volunteers order by id");
 return db.camelize(rows);
};

exports.add = async (volunteer) => {
 await db.getPool().query("insert into volunteers (first_name, last_name) values ($1, $2);",
   [volunteer.firstName, volunteer.lastName]);
};

exports.get = async (id) => {
 const { rows } = await db.getPool().query("select * from volunteers where id = $1", [id])
 return db.camelize(rows)[0]
};

exports.upsert = (volunteer) => {
  if (volunteer.id) {
    exports.update(volunteer);
  } else {
    exports.add(volunteer);
  }
};

exports.update = async (volunteer) => {
 await db.getPool().query("update volunteers set first_name = $1, last_name = $2 where id = $3;",
   [volunteer.firstName, volunteer.lastName, volunteer.id]);
};

exports.allForSite = async (site) => {
  const { rows } = await db.getPool().query(`
    select volunteers.* from volunteers
    JOIN volunteers_sites on volunteers_sites.volunteer_id = volunteers.id
    where volunteers_sites.site_id = $1;`, [site.id]);
  return db.camelize(rows);
};