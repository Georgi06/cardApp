import {promises} from "fs";
import {User} from "../types/User";
import {UserDataInput} from "../types/UserDataInput";
import {UpdateUserData} from "../types/UpdateUserData";
import {Request, Response} from "express";
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

export class UserModel {

    //database connection
    private conn;

    constructor() {
        const pool = mysql.createPool({host:'localhost', user: 'root', database: 'cardapp'});
        this.conn = pool.promise();
    }

    async getUsers(): Promise<User[]>{
        const [rows] = await this.conn.query("SELECT * FROM users");
        return rows;

    }
    async getLoginUsername(): Promise <string>{
        const username = await this.conn.query("SELECT username FROM users");
        return username;
    }
    async getLoginPassword(): Promise <string>{
        const password = await this.conn.query("SELECT password FROM users");
        return password;
    }

    async findUser(id : number): Promise<User[]>{
        const [rows] = this.conn.execute(`SELECT * FROM users WHERE id = ?`, [id]);
        return rows;

    }

    async createUser(userDataInput: UserDataInput): Promise<boolean>{
        const insertDataObject = [
            userDataInput.username,
            userDataInput.password,
            (userDataInput.email) ? userDataInput.email : null,
            (userDataInput.first_name) ? userDataInput.first_name : null,
            (userDataInput.last_name) ? userDataInput.last_name : null
        ]
        await this.conn.execute("INSERT INTO users (username, password, email, first_name, last_name ) VALUES (?,?,?,?,?)", insertDataObject)

        return true;
    }

    async createHashUser (req: Request, res: Response,userDataInput: UserDataInput) {
        const passwordForHash = userDataInput.password;

        bcrypt.hash(passwordForHash, 10, (hashError, hash) => {
            if (hashError) {
                return res.status(401).json({
                    message: hashError.message,
                    error: hashError
                });
            }
        });

        const insertDataObject = [
            userDataInput.username,

            (userDataInput.email) ? userDataInput.email : null,
            (userDataInput.first_name) ? userDataInput.first_name : null,
            (userDataInput.last_name) ? userDataInput.last_name : null
        ]
        await this.conn.execute("INSERT INTO users (username, password, email, first_name, last_name ) VALUES (?,hash,?,?,?)", insertDataObject)
    };


    public async updateUser(id : number, updateUserData: UpdateUserData): Promise<boolean>{
        const updateUserDataArray = Object.entries(updateUserData);
        let setStatement = "";
        let preparedStatementData = [];
        for (let i = 0; i < updateUserDataArray.length; i++){
            setStatement += `${updateUserDataArray[i][0]} = ?`
            setStatement += (i + 1 !== updateUserDataArray.length) ? "," : " ";
            preparedStatementData.push(updateUserDataArray[i][1])
        }
        console.log(setStatement);
        preparedStatementData.push(id);
        await this.conn.execute(`UPDATE users SET ${setStatement} WHERE id = ?`, preparedStatementData)
        return true;
    }

     async deleteUser(id: number): Promise<boolean> {
        await this.conn.execute("DELETE FROM users WHERE id = ?", [id])

        return true;
    }


}
