import {Request, Response} from "express";
import  {UserModel} from "../models/UserModel";
import {User} from "../types/User";
import {UserDataInput} from "../types/UserDataInput";
import {UpdateUserData} from "../types/UpdateUserData";
import {LoginData} from "../types/LoginData";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10;

    //create
    export const createUser= async (req: Request, res: Response) => {
    let userData: UserDataInput = req.body;

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

        await userModel.createHashUser(userData);

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
    export const updatePassword= async (req: Request, res: Response) => {
        let username = req.params.username;
        let updateUserData: UpdateUserData = req.body;
        const userModel = new UserModel();
        await userModel.updatePassword(username, updateUserData);
        console.log(username)

        res.send({
            status: 200,
            message: `User with username:${username} updated`
        })
    }


    //delete
    export const deleteUser = async (req: Request, res: Response)=> {
        let username = req.params.username;
        const userModel = new UserModel();
        await userModel.deleteUser(username);


            res.send({
                status: 200,
                message: `User with username:${username} was deleted`
            })

    }


    export const Login = async (req: Request, res: Response) => {
        let userData: LoginData = req.body;
        let users: User[] = await new UserModel().getUsers();
        let userPassword = userData.password;



        const findUser = users.find(user => user.username == userData.username);
        const findUserRole = findUser.role;
        const dbPassword = findUser.password;
        const matchPassword = await bcrypt.compare(userPassword,dbPassword);


        if(!findUser) {
            return res.send({
                status: 400,
                message: "No such user"
            })
        }

        if (findUser && findUser.username != userData.username) {
            return res.send({
                status: 400,
                message: "Incorrect username"
            })
        }

        if(!matchPassword){
            return res.send({
                status: 400,
                message: "Incorrect password"
            })
        }


        let token = jwt.sign({findUser}, 'abc123',{ expiresIn: '31556926s' });

        //res.send({token})

        res.send({
            User: findUser.username,
            Authtoken: token,
            Role: findUserRole
        })

    }






