
DROP database if exists QrAttendance;

CREATE database QrAttendance;

USE QrAttendance;
# CREACIÓN DE LA BASE DE DATOS
# User
CREATE TABLE user (
    user_id varchar(100) PRIMARY KEY NOT NULL UNIQUE,
    name varchar(25) NOT NULL,
    email varchar(25) NOT NULL,
    password varchar(100) NOT NULL,
    mothers_name varchar(25) NOT NULL,
    fathers_name varchar(25) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE timezone(
    timezone_id varchar(100) PRIMARY KEY NOT NULL,
    timezone varchar(25)
);

CREATE TABLE language(
    language_id varchar(100) PRIMARY KEY NOT NULL,
    language varchar(25)
);

# User preferences
CREATE TABLE preferences(
    preference_id varchar(100) PRIMARY KEY NOT NULL,
    user_id varchar(100),
    timezone_id varchar(100),
    language_id varchar(100),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (timezone_id) REFERENCES timezone(timezone_id),
    FOREIGN KEY (language_id) REFERENCES language(language_id)
);

CREATE TABLE registry(
    registry_id varchar(100) PRIMARY KEY NOT NULL,
    name varchar(25) NOT NULL,
    mothers_name varchar(25) NOT NULL,
    fathers_name varchar(25) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE qr_code(
    qr_id varchar(100) PRIMARY KEY NOT NULL,
    user_id varchar(100),
    name varchar(25),
    url varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE qr_code_registry(
    qr_id varchar(100),
    registry_id varchar(100),
    FOREIGN KEY (qr_id) REFERENCES qr_code(qr_id),
    FOREIGN KEY (registry_id) REFERENCES registry(registry_id),
    PRIMARY KEY (qr_id, registry_id)
);

# ASIGNACIÓN DE VALORES DENTRO DE LA BASE DE DATOS
# --- REGISTRAR USUARIOS DENTRO DE LA DB ----
INSERT INTO user(user_id, name, email, password, mothers_name, fathers_name, created_at, updated_at)
VALUES('93945', 'Juan', 'Juan12@gmail.com', 'Juan1233', 'Dzul', 'Hau', UTC_DATE, UTC_DATE);

INSERT INTO user(user_id, name, email, password, mothers_name, fathers_name, created_at, updated_at)
VALUES('94356', 'Alejandro', 'Alejandro12@gmail.com', 'Alejandro1223', 'May', 'Chimal', UTC_DATE, UTC_DATE);

INSERT INTO user(user_id, name, email, password, mothers_name, fathers_name, created_at, updated_at)
VALUES('45624', 'Carla', 'Carla12@gmail.com', 'Carla123', 'Soliz', 'Manzanero', UTC_DATE, UTC_DATE);

# --- REGISTRAR QR'S ASOCIADOS A LOS USUARIOS
INSERT INTO qr_code(qr_id, user_id) VALUES ('9284', '94356');
INSERT INTO qr_code(qr_id, user_id) VALUES ('9352', '94356');
INSERT INTO qr_code(qr_id, user_id) VALUES ('3753', '45624');

# PONEMOS REGISTROS ASOCIADOS A LOS QR CREADOS
INSERT INTO registry(registry_id, name, mothers_name, fathers_name) VALUES ('5356', 'Limbert', 'May', 'Ek');
INSERT INTO registry(registry_id, name, mothers_name, fathers_name) VALUES ('9135', 'Alberto', 'Hau', 'Lopez');
INSERT INTO registry(registry_id, name, mothers_name, fathers_name) VALUES ('2356', 'Alejandra', 'Garcia', 'Caamal');

# Asociamos los registros a los QR
INSERT INTO qr_code_registry(qr_id, registry_id) VALUES ('9284', '5356');
INSERT INTO qr_code_registry(qr_id, registry_id) VALUES ('9352', '2356');
INSERT INTO qr_code_registry(qr_id, registry_id) VALUES ('9284', '2356');

# REGISTRAMOS LOS IDIOMAS
INSERT INTO language(language_id, language) VALUES ('2985', 'es-ES');
INSERT INTO language(language_id, language) VALUES ('3561', 'en-US');

# REGISTRAMOS LAS ZONAS HORARIAS
INSERT INTO timezone(timezone_id, timezone) VALUES ('1256', 'UTC-5');
INSERT INTO timezone(timezone_id, timezone) VALUES ('2753', 'UTC-6');

# LE INDICAMOS LAS PREFERENCIAS A UN USUARIO
INSERT INTO preferences(preference_id, user_id, timezone_id, language_id) VALUES ('1635', '93945', '1256', '2985');
