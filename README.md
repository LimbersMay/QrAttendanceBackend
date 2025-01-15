
# QrAttendanceBackend
> Backend for easyQrAttendance app

## Table of contents
* [General info](#general-info)
* [Main Technologies used](#main-technologies-used)
* [Previous requirements](#previous-requirements)
* [Setup](#setup)
* [API Documentation](https://documenter.getpostman.com/view/18052163/2s9XxyRtJH)

## General info
This project is a backend for easyQrAttendance app. It is a simple REST API that allows to create and manage users, groups and attendance lists. It also provides endpoints for QR code generation and attendance list signing.

## Main Technologies used
* Node - version 20.0.0
* Express - version 4.18.2
* Mysql - version 2.3.3
* Sequelize - version 6.28.0

## Previous requirements
* Node.js
* Mysql (optional if you use docker)
* Docker (optional)
* Docker-compose (optional)

Before running the project, you need to create an **.development.env** file in the root directory of the project. This file must contain the following environment variables:

```
COOKIE_SECRET=yoursecret
SESSION_SECRET=yoursecret

MYSQL_DATABASE=your_database_name
MYSQL_HOST=your_database_host
MYSQL_PASSWORD=your_database_password
MYSQL_PORT=your_database_port
MYSQL_USER=your_database_user

GOOGLE_CLIENT_ID=your_google_client_id generated in https://console.cloud.google.com/ OAuth 2.0 Client IDs
GOOGLE_CLIENT_SECRET=your_google_client_secret generated in the above link
API_URL= your_api_url
CLIENT_URL= your_client_url
```

Also, **you need to execute the QrAttendance.sql** file in your database to create the tables.

## Setup

#### To run this project, install it locally using npm:

```
$ git clone https://github.com/LimbersMay/QrAttendanceBackend.git
$ cd QrAttendanceBackend
$ npm install
```

#### Alternatively, you can use docker-compose:

```
$ git clone https://github.com/LimbersMay/QrAttendanceBackend.git
$ cd QrAttendanceBackend
$ docker-compose up
```
