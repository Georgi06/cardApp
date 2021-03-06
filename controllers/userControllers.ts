import {Request, Response} from "express";
import  {UserModel} from "../models/UserModel";
import {User} from "../types/User";
import {UserDataInput} from "../types/UserDataInput";
import {UpdateUserData} from "../types/UpdateUserData";
import {LoginData} from "../types/LoginData";
import {hash} from 'bcrypt' ;
import  {extractJWT} from "../extractJWT";
import {signJWT} from "../signJwt";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10;

    //create
    export const createUser= async (req: Request, res: Response) => {
    let userData: UserDataInput = req.body;
        console.log(userData);

        if (!userData.username) {
            return res.send({
                status: 400,
                message: "No username"
         })
        }
        if (!userData.password) {
            return res.send({
                status: 400,
                message: "No password"
         })
        }

        const userModel = new UserModel();
        await userModel.createUser(userData);
        res.send({
        status: 200,
        message: "User created"
        })

    }

    //read
    export const getAllUsers = async (req: Request, res: Response) => {
        let users: User[] = await new UserModel().getUsers();
        res.send(users);
    }

    export const getUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const userModel = new UserModel();
        let user: User[] = await userModel.findUser(id);
        console.log(user);
        res.send(user);

    }

    //update
    export const updateUser= async (req: Request, res: Response) => {
        let id = Number(req.params.id);
        let updateUserData: UpdateUserData = req.body;
        const userModel = new UserModel();
        await userModel.updateUser(id, updateUserData);

        res.send({
            status: 200,
            message: `User with id:${id} updated`
        })
    }

    //delete
    export const deleteUser = async (req: Request, res: Response)=> {
        let id = Number(req.params.id);
        const userModel = new UserModel();
        await userModel.deleteUser(id);

        res.send({
            status: 200,
            message: `User with id: ${id} was deleted`
        })
    }


    // export const LoginToken = async (req:Request,res:Response) => {
    //     let { username, password } = req.body;
    //     let users: User[] = await new UserModel().getUsers();
    //
    //     bcrypt.compare(password, users[0].password, (error, result) => {
    //         if (error) {
    //             return res.status(401).json({
    //                 message: 'Password Mismatch'
    //             });
    //         } else if (result) {
    //             signJWT(users[0], (_error, token) => {
    //                 if (_error) {
    //                     return res.status(401).json({
    //                         message: 'Unable to Sign JWT',
    //                         error: _error
    //                     });
    //                 } else if (token) {
    //                     return res.status(200).json({
    //                         message: 'Auth Successful',
    //                         token,
    //                         user: users[0]
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // }

    // function generateAccessToken(username,password) {
    //     const tokenSecret = '1234abc';
    //     return jwt.sign({username,password},tokenSecret, { expiresIn: '31556926s' });
    // }


    export const Login = async (req: Request, res: Response) => {
        let userData: LoginData = req.body;

        let users: User[] = await new UserModel().getUsers();
        //users.forEach(item => obj[item.username] = item.password);

        const foundUser = users.find(user => user.username == userData.username || user.password == userData.password)

        if(!foundUser) {
            return res.send({
                status: 400,
                message: "No such user"
            })
        }

        if (foundUser && foundUser.username != userData.username) {
            return res.send({
                status: 400,
                message: "Incorrect username"
            })
        }
        if (foundUser && foundUser.password != userData.password) {
            return res.send({
                status: 400,
                message: "Incorrect password"
            })
        }
        let token = jwt.sign({foundUser}, 'abc123',{ expiresIn: '31556926s' });

        //res.send({token})

        res.send({
            User: foundUser.username,
            Authtoken: token
        })

    }






