"use strict";
exports.__esModule = true;
var userRouter_1 = require("./routers/userRouter");
var express_1 = require("express");
var express = require('express');
var app = express();
var port = 3001;
app.use((0, express_1.json)());
app.use("/", userRouter_1.userRoutes);
app.listen(port, function () {
    console.log("App listening on port ".concat(port));
});
