import {NextFunction, Request,Response} from "express";

const jwt = require('jsonwebtoken');

export const authenticateToken =(req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, 'abc123');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
}