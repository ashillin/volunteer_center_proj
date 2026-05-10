const db = require('../database')

exports.add = async (notice) => {
  await db.getPool().query("insert into notices (notice, site_id, volunteer_id, created_at) values ($1, $2, $3, CURRENT_TIMESTAMP);",
        [notice.notice, notice.siteId, notice.volunteerId]);
}

exports.update = async (notice) => {
    await db.getPool().query("update notices set notice = $1 where id = $2;",
        [notice.notice, notice.id]);
}

exports.upsert = (notice) => {
  if (notice.id) {
    exports.update(notice);
  } else {
    exports.add(notice);
  }
}

exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from notices where id = $1", [id])
      return db.camelize(rows)[0]
}

exports.allForSite = async (site) => {
  const { rows } = await db.getPool().query(`
    select notices.*, users.email as user_email from notices
    join volunteers on volunteers.id = notices.volunteer_id
    join users on users.volunteer_id = volunteers.id
    where notices.site_id = $1`, [site.id])
  return db.camelize(rows)
}