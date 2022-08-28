CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS superpowers(
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS vehicles(
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
)

CREATE TABLE IF NOT EXISTS mutants(
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    name VARCHAR(255) NOT NULL,
    group VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    vehicle UUID REFERENCES vehicle
);

CREATE TABLE IF NOT EXISTS mutants_superpowers(
    mutant_id UUID REFERENCES mutants,
    superpower_id UUID REFERENCES superpower,
    PRIMARY KEY(mutant_id,  superpower_id)
);

