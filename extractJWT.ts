import {Request, Response, NextFunction,} from "express";
const jwt = require('jsonwebtoken');


const TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';

export const TOKEN = {
    token: {
        expireTime: TOKEN_EXPIRETIME,
        issuer: TOKEN_ISSUER,
        secret: TOKEN_SECRET
    }
};



export const extractJWT= (req:Request, res:Response, next:NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (token){
        jwt.verify(token,  TOKEN.token.secret, (error, decoded)=>{
            if (error){
                return res.status(404).json({
                    message: error.message,
                    error
                })
            }else{
                res.locals.jwt = decoded;
                next();
            }
        })
    }else{
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}