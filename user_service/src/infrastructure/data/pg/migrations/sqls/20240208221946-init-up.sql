CREATE TYPE user_role AS ENUM ('user', 'admin', 'god');

CREATE TABLE "users" (
    "id"          bigserial PRIMARY KEY,
    "username"    varchar(50) NOT NULL,
    "email"       varchar(50) NOT NULL,
    "password"    varchar(255) NOT NULL,
    "image_url"   varchar(255) DEFAULT NULL,
    "is_active"   boolean DEFAULT false,
    "role"        user_role NOT NULL DEFAULT 'user',
    "created_at"  timestamptz NOT NULL DEFAULT (now()),
    "updated_at"  timestamptz
);

CREATE TABLE "users_profile" (
    "id"            bigserial PRIMARY KEY,
    "address_1"     varchar(100) NOT NULL,
    "address_2"     varchar(100) DEFAULT NULL,
    "country"       varchar(20) NOT NULL,
    "zip_code"      varchar(10) NOT NULL,
    "city"          varchar(50) NOT NULL,
    "name"          varchar(50) NOT NULL,
    "surname"       varchar(50) NOT NULL,
    "phone"         varchar(20) NOT NULL,
    "user_score"    float,
    "wish_list"     integer[] NOT NULL,
    "references"    integer[] NOT NULL,
    "user_id"       bigint,
    CONSTRAINT "fk_user_address_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

CREATE INDEX ON "users" ("email")
