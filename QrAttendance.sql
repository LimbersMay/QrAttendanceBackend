
DROP database if exists QrAttendance;

CREATE database QrAttendance;

USE QrAttendance;

CREATE TABLE user (
    user_id INT PRIMARY KEY NOT NULL UNIQUE,
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
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE qr_registry(
    qr_id INT,
    registry_id INT,
    FOREIGN KEY (qr_id) REFERENCES qr_code(qr_id),
    FOREIGN KEY (registry_id) REFERENCES registry(registry_id),
    PRIMARY KEY (qr_id, registry_id)
);

