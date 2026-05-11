const db = require('../database')

exports.all = async () => {
 const { rows } = await db.getPool().query("select * from sites order by id");
 return db.camelize(rows);
}

exports.add = async (site) => {
 const { rows } = await db.getPool().query("insert into sites (site_name, location, hours_op, site_status, volunteer_id) values ($1, $2, $3, $4, $5) RETURNING *;",
   [site.siteName, site.location, site.hoursOp, true, site.volunteerId]);
     let newSite = db.camelize(rows)[0]
  await addVolunteersToSite(newSite, site.volunteerIds);
  await db.getPool().query(
  "INSERT INTO assignments (volunteer_id, site_id, role_id) VALUES ($1, $2, $3);",
  [site.volunteerId, newSite.id, site.roleId]
  );
  return newSite
};

exports.get = async (id) => {
 const { rows } = await db.getPool().query("select * from sites where id = $1", [id])
 return db.camelize(rows)[0]
};

exports.upsert = async (site) => {
  if (!site.volunteerIds) {
  site.volunteerIds = [];  // ✅ default to empty array if none selected
  }
  if (site.volunteerIds && ! Array.isArray(site.volunteerIds)) {
    site.volunteerIds = [site.volunteerIds];
  }
  if (site.id) {
    await exports.update(site);
  } else {
    await exports.add(site);
  }
};

exports.update = async (site) => {
 const { rows } = await db.getPool().query("update sites set site_name = $1, location = $2, created_at = $3, hours_op = $4, site_status = $5 where id = $6;",
   [site.siteName, site.location, site.createdAt, site.hoursOp, site.siteStatus === "true", site.id]);
  await DeleteVolunteersForSite(site) // By first deleting the relevant volunteers_sites records, we prevent accidental duplicates
  await addVolunteersToSite(site, site.volunteerIds)
  return site
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