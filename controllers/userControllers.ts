import {Request, Response} from "express";
import  {UserModel} from "../models/UserModel";
import {User} from "../types/User";
import {UserDataInput} from "../types/UserDataInput";
import {UpdateUserData} from "../types/UpdateUserData";
//import {LoginData} from "../types/LoginData";


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




    // export const login =(req: Request, res: Response) => {
    //     const loginRequest: LoginData = req.query;
    //
    //     if (!loginRequest.username || !loginRequest.password) {
    //         return res.send({
    //             status: 400,
    //             message: "Username or password not provided"
    //         })
    //     }
    // }






