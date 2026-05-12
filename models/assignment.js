const db = require('../database')


exports.add = async (assignment) => {
    await db.getPool().query("insert into assignments (volunteer_id, site_id, role_id, time_started, time_ended) values ($1, $2, $3, $4, $5);",
        [assignment.volunteerId, assignment.siteId, assignment.roleId, assignment.timeStarted, assignment.timeEnded]);
};

exports.get = async (volunteerId, siteId, roleId) => {
  const { rows } = await db.getPool().query(`select * from assignments where volunteer_id = $1 and site_id = $2`, [volunteerId, siteId])
  return db.camelize(rows)[0]
};

exports.AllForUser = async (user) => {
  console.log('AllForUser called with:', user);
  const { rows } = await db.getPool().query(
    `select sites.id, sites.site_name, assignments.time_started, assignments.time_ended, roles.role_name from assignments
     join volunteers on volunteers.id = assignments.volunteer_id
     join roles on roles.id = assignments.role_id
     join sites on sites.id = assignments.site_id
     where volunteers.id = $1`, [user.volunteerId])
    return db.camelize(rows)
};

exports.update = async (assignment) => {
    await db.getPool().query("update asignments set volunteer_id = $1 and site_id = $2 and role_id = $3 where id = $4;",
        [assignment.volunteerId, assignment.siteId, assignment.roleId, assignment.id]);
};

exports.upsert = async (assignment) => {
  const existing = await exports.get(assignment.volunteerId, assignment.siteId);
  if (existing) {
    await db.getPool().query(
      "UPDATE assignments SET role_id = $1 WHERE volunteer_id = $2 AND site_id = $3;",
      [assignment.roleId, assignment.volunteerId, assignment.siteId]
    );
  } else {
    await exports.add(assignment);
  }
};
