\c vc_db

-- volunteers
insert into volunteers (first_name, last_name, volunteer_status) values('Frank', 'Herbert', true);
insert into volunteers (first_name, last_name, volunteer_status) values('Yoshihiro', 'Togashi', true);
insert into volunteers (first_name, last_name, volunteer_status) values('Akutami', 'Gege', true);

-- users (paste generated output here)
insert into users (first_name, last_name, email, salt, password, volunteer_id) values('Frank', 'Herbert', 'frank@test.com', '723b2b1d4b12ed7dcf969048e8596407', '2b5aedc599e8e3a59c69a8ee8dee80c5dc5dac585ce24a453a1ae00eceaa3188', 1);
insert into users (first_name, last_name, email, salt, password, volunteer_id) values('Yoshihiro', 'Togashi', 'yoshi@test.com', 'f040103ded0d7c397f4f557f027ce88f', 'ee216f113edbb0807fbc38cad326a063d6ba66dbe5adcd8cc04f7f1d858f8181', 2);
insert into users (first_name, last_name, email, salt, password, volunteer_id) values('Akutami', 'Gege', 'akutami@test.com', '67c9ec3b8cfbe976456acca100d62ee0', '59fadba0279346c9a4a2031ee3def313e1e9961933a0a6b19ed522b7dd2154ae', 3);

-- sites
insert into sites (site_name, location, hours_op, site_status, volunteer_id, created_at) values('Valentine Ave', '2544 Valentine Ave', '9am-5pm', true, 1, '2005-09-21');
insert into sites (site_name, location, hours_op, site_status, volunteer_id, created_at) values('University Heights', '149th street 3rd Ave', '10am-4pm', true, 2, '2013-08-21');
insert into sites (site_name, location, hours_op, site_status, volunteer_id, created_at) values('Fordham University', 'Fordham Road', '10am-2pm', true, 3, '2026-05-21');

-- roles
insert into roles (role_name, description) values('Chef', 'Prepares food for the site.');
insert into roles (role_name, description) values('Tech person', 'In charge of making sure technology at the site is working as intended.');
insert into roles (role_name, description) values('Greeter', 'Greets people that walk up to the site and explains the sites purpose to them.');

-- assignments
insert into assignments (volunteer_id, site_id, role_id, time_started) values(1, 1, 1, '2005-09-21');
insert into assignments (volunteer_id, site_id, role_id, time_started) values(2, 2, 2, '2013-08-21');
insert into assignments (volunteer_id, site_id, role_id, time_started) values(3, 3, 3, '2026-05-21');

-- notices
insert into notices (site_id, volunteer_id, notice) values(1, 1, 'Bodega nearby if anyone needs to grab a snack or food');
insert into notices (site_id, volunteer_id, notice) values(2, 2, 'Volunteers from local high school come by to help on Weekends');
insert into notices (site_id, volunteer_id, notice) values(3, 3, 'Try to avoid interacting with campus security they can be hostile towards us');