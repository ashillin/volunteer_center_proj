\c vc_db

insert into volunteers (first_name, last_name) values('Frank', 'Herbert');
insert into volunteers (first_name, last_name) values('Yoshihiro', 'Togashi');
insert into volunteers (first_name, last_name) values('Akutami', 'Gege');

insert into sites (site_name, location, created_at, hours_op, site_status) values('Valentine Ave', '2544 Valentine Ave', '2005-09-21', '9am-5pm', true);
insert into sites (site_name, location, created_at, hours_op, site_status) values('University Heights', '149th street 3rd Ave', '2013-08-21', '10am-4pm', true);
insert into sites (site_name, location, created_at, hours_op, site_status) values('Fordham University', 'Fordham Road', '2026-05-21', '10am-2pm', true);

insert into roles (role_name, description) values('Chef', 'Prepares food for the site.');
insert into roles (role_name, description) values('Tech person', 'In charge of making sure technology at the site is working as intended.');
insert into roles (role_name, description) values('Greeter', 'Greets people that walk up to the site and explains the sites purpose to them.');

-- insert into assignments (volunteer_id, site_id, role_id, time_started) values('1', '1', '1', '2005-09-21');
-- insert into assignments (volunteer_id, site_id, role_id, time_started) values('2', '2', '2', '2013-08-21');
-- insert into assignments (volunteer_id, site_id, role_id, time_started) values('3', '3', '3', '2026-05-21');