
DROP database if exists QrAassistance;

CREATE database QrAassistance;

USE QrAassistance;

CREATE TABLE professor (
    professor_id INT PRIMARY KEY NOT NULL UNIQUE,
    name varchar(25) NOT NULL,
    email varchar(25) NOT NULL,
    password varchar(25) NOT NULL,
    mothers_name varchar(25) NOT NULL,
    fathers_name varchar(25) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE registry(
    registry_id INT PRIMARY KEY NOT NULL,
    name varchar(25) NOT NULL,
    mothers_name varchar(25) NOT NULL,
    fathers_name varchar(25) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE qr_code(
    qr_id INT PRIMARY KEY NOT NULL,
    professor_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (professor_id) REFERENCES professor(professor_id)
);

CREATE TABLE qr_registry(
    qr_id INT,
    registry_id INT,
    FOREIGN KEY (qr_id) REFERENCES qr_code(qr_id),
    FOREIGN KEY (registry_id) REFERENCES registry(registry_id),
    PRIMARY KEY (qr_id, registry_id)
);

