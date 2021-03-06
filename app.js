"use strict";
exports.__esModule = true;
var userRouter_1 = require("./routers/userRouter");
var express_1 = require("express");
var bodyParser = require("body-parser");
var cardRouter_1 = require("./routers/cardRouter");
var express = require('express');
var app = express();
var cors = require("cors");
var port = 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use((0, express_1.json)());
app.use("/", userRouter_1.userRoutes);
app.use("/", cardRouter_1.cardRoutes);
app.listen(port, function () {
    console.log("App listening on port ".concat(port));
});
/*
Database site
https://www.freemysqlhosting.net/account/
https://www.phpmyadmin.co/index.php
 */
/*
Database host----------
Server: sql11.freemysqlhosting.net
Name: sql11489599
Username: sql11489599
Password: 2fsq3beaJr
Port number: 3306
 */
