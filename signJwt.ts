import {TOKEN} from "./extractJWT";
import {User} from "./types/User";
import {LoginData} from "./types/LoginData";

const jwt = require('jsonwebtoken');

export const signJWT = (user: LoginData, callback: (error: Error | null, token: string | null) => void): void => {
    let timeSinceEpoch = new Date().getTime();
    let expirationTime = timeSinceEpoch + Number(TOKEN.token.expireTime) * 100000;
    let expirationTimeInSeconds = Math.floor(expirationTime / 1000);


    try {
        jwt.sign(
            {
                username: user.username
            },
            TOKEN.token.secret,
            {
                issuer: TOKEN.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        callback(error, null);
    }
};