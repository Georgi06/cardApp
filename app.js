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
