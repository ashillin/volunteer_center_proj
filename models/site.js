const db = require('../database')

exports.all = async () => {
 const { rows } = await db.getPool().query("select * from sites order by id");
 return db.camelize(rows);
}

exports.add = async (site) => {
 const { rows } = await db.getPool().query("insert into sites (site_name, location, created_at, hours_op) values ($1, $2, $3, $4) RETURNING *;",
   [site.siteName, site.location, site.createdAt, site.hoursOp]);
     let newSite = db.camelize(rows)[0]
  await addVolunteersToSite(newSite, site.volunteerIds)
  return newSite
};

exports.get = async (id) => {
 const { rows } = await db.getPool().query("select * from sites where id = $1", [id])
 return db.camelize(rows)[0]
};

exports.upsert = (site) => {
  if (site.volunteerIds && ! Array.isArray(site.volunteerIds)) {
    site.volunteerIds = [site.volunteerIds];
  }
  if (site.id) {
    exports.update(site);
  } else {
    exports.add(site);
  }
};

exports.update = async (site) => {
 const { rows } = await db.getPool().query("update sites set site_name = $1, location = $2, created_at = $3, hours_op = $4 where id = $5;",
   [site.siteName, site.location, site.createdAt, site.hoursOp, site.id]);
     let newSite = db.camelize(rows)[0]
  await DeleteVolunteersForSite(newSite) // By first deleting the relevant volunteers_sites records, we prevent accidental duplicates
  await addVolunteersToSite(newSite, site.volunteerIds)
  return newSite
}
const addVolunteersToSite = async (site, volunteerIds) => {
  volunteerIds.forEach(async (volunteerId) => {
    await db.getPool().query(`
      INSERT INTO volunteers_sites(volunteer_id, site_id) values($1,$2)
      `,[volunteerId,site.id])
  })
}
const DeleteVolunteersForSite = async (site) => {
  db.getPool().query(`DELETE from volunteers_sites where site_id = $1`, [site.id]);
}
;