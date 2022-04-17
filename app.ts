import {userRoutes} from "./routers/userRouter";
import {json} from "express";


const express = require('express');
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(json());
app.use("/", userRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})