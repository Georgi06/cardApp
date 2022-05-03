import {userRoutes} from "./routers/userRouter";
import {json} from "express";
import {Request, Response} from "express";
import bodyParser = require("body-parser");
import {cardRoutes} from "./routers/cardRouter";


const express = require('express');
const app = express();
const cors = require("cors");
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(json());
app.use("/", userRoutes);
app.use("/", cardRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
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
