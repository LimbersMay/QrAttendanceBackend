# noinspection SpellCheckingInspectionForFile

DROP database if exists QrAttendance;

CREATE database QrAttendance;

USE QrAttendance;
# CREACIÓN DE LA BASE DE DATOS
# User
CREATE TABLE user
(
    userId      varchar(100) PRIMARY KEY NOT NULL UNIQUE,
    name         varchar(25)              NOT NULL,
    email        varchar(25)              NOT NULL UNIQUE,
    password     varchar(100)             NOT NULL,
    lastname     varchar(25)              NOT NULL,
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE timezone
(
    timezone_id varchar(100) PRIMARY KEY NOT NULL,
    timezone    varchar(25)
);

CREATE TABLE language
(
    language_id varchar(100) PRIMARY KEY NOT NULL,
    language    varchar(25)
);

# User preferences
CREATE TABLE preferences
(
    preferenceId varchar(100) PRIMARY KEY NOT NULL,
    userId       varchar(100),
    timezoneId   varchar(100),
    languageId   varchar(100),
    FOREIGN KEY (userId) REFERENCES user (userId),
    FOREIGN KEY (timezoneId) REFERENCES timezone (timezone_id),
    FOREIGN KEY (languageId) REFERENCES language (language_id)
);

CREATE TABLE `group`
(
    groupId   varchar(100) PRIMARY KEY NOT NULL,
    userId    varchar(100),
    name       varchar(25)              NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES user (userId) ON DELETE CASCADE
);

CREATE TABLE qrCode
(
    qrId      varchar(100) PRIMARY KEY NOT NULL,
    groupId   varchar(100),
    ownerId  varchar(100)             NOT NULL,
    name       varchar(25),
    url        varchar(255),
    enabled    boolean DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    udpatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (groupId) REFERENCES `group` (groupId) ON DELETE CASCADE,
    FOREIGN KEY (ownerId) REFERENCES user (userId)
);

CREATE TABLE registry
(
    registryId  varchar(100) PRIMARY KEY NOT NULL,
    qrId        varchar(100)             NOT NULL,
    ownderId    varchar(100)            NOT NULL,
    name         varchar(25)              NOT NULL,
    first_surname varchar(25)              NOT NULL,
    second_surname varchar(25)              NOT NULL,
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (qrId) REFERENCES qrCode (qrId) ON DELETE CASCADE,
    FOREIGN KEY (ownderId) REFERENCES user (userId)
);


/*
# ASIGNACIÓN DE VALORES DENTRO DE LA BASE DE DATOS
# --- REGISTRAR USUARIOS DENTRO DE LA DB ----
INSERT INTO user(userId, name, email, password, mothers_name, fathers_name, created_at, updated_at)
VALUES ('93945', 'Juan', 'Juan12@gmail.com', 'Juan1233', 'Dzul', 'Hau', UTC_DATE, UTC_DATE);

INSERT INTO user(userId, name, email, password, mothers_name, fathers_name, created_at, updated_at)
VALUES ('94356', 'Alejandro', 'Alejandro12@gmail.com', 'Alejandro1223', 'May', 'Chimal', UTC_DATE, UTC_DATE);

INSERT INTO user(userId, name, email, password, mothers_name, fathers_name, created_at, updated_at)
VALUES ('45624', 'Carla', 'Carla12@gmail.com', 'Carla123', 'Soliz', 'Manzanero', UTC_DATE, UTC_DATE);

# --- REGISTRAR LOS GRUPOS DE LOS USUARIOS
INSERT INTO `group`(group_id, userId, name, created_at, updated_at)
VALUES ('12345', '93945', 'Grupo 1', UTC_DATE, UTC_DATE);
INSERT INTO `group`(group_id, userId, name, created_at, updated_at)
VALUES ('12346', '93945', 'Grupo 2', UTC_DATE, UTC_DATE);

# --- REGISTRAR QR'S ASOCIADOS A LOS GRUPOS
INSERT INTO qr_code(qr_id, group_id, name, url, created_at, updated_at)
VALUES ('9284', '12345', 'QR 1', 'https://www.google.com', UTC_DATE, UTC_DATE);
INSERT INTO qr_code(qr_id, group_id, name, url, created_at, updated_at)
VALUES ('9352', '12345', 'QR 2', 'https://www.google.com', UTC_DATE, UTC_DATE);

INSERT INTO registry(registry_id, qr_id, name, mothers_name, fathers_name)
VALUES ('5356', '9284', 'Limbert', 'May', 'Ek');
INSERT INTO registry(registry_id, qr_id, name, mothers_name, fathers_name)
VALUES ('9135', '9352', 'Alberto', 'Hau', 'Lopez');

# REGISTRAMOS LOS IDIOMAS
INSERT INTO language(language_id, language)
VALUES ('2985', 'es-ES');
INSERT INTO language(language_id, language)
VALUES ('3561', 'en-US');

# REGISTRAMOS LAS ZONAS HORARIAS
INSERT INTO timezone(timezone_id, timezone)
VALUES ('1256', 'UTC-5');
INSERT INTO timezone(timezone_id, timezone)
VALUES ('2753', 'UTC-6');

# LE INDICAMOS LAS PREFERENCIAS A UN USUARIO
INSERT INTO preferences(preference_id, userId, timezone_id, language_id)
VALUES ('1635', '93945', '1256', '2985');
/*