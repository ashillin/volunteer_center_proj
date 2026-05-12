drop database if exists vc_db;

create database vc_db;

\c vc_db

CREATE TABLE "sites" (
  "id" serial,
  "volunteer_id" int,
  "site_name" text,
  "location" text,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "hours_op" text,
  "site_status" boolean,
  PRIMARY KEY ("id")
);

CREATE TABLE "users" (
  "id" serial,
  "volunteer_id" int,
  "first_name" text,
  "last_name" text,
  "email" text,
  "password" text,
  "salt" text,
  PRIMARY KEY ("id")
);

CREATE TABLE "volunteers" (
  "id" serial,
  "user_id" int,
  "first_name" text,
  "last_name" text,
  "volunteer_status" boolean,
  PRIMARY KEY ("id")
);

CREATE TABLE "volunteers_sites" (
  "id" serial primary key,
  "volunteer_id" int,
  "site_id" int
);

CREATE TABLE "notices" (
  "id" serial,
  "site_id" int,
  "volunteer_id" int,
  "notice" text,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE "roles" (
  "id" serial,
  "role_name" text,
  "description" text,
  PRIMARY KEY ("id")
);

CREATE TABLE "assignments" (
  "id" serial,
  "volunteer_id" int,
  "site_id" int,
  "role_id" int,
  "time_started" timestamp DEFAULT CURRENT_TIMESTAMP,
  "time_ended" timestamp,
  PRIMARY KEY ("id")
);