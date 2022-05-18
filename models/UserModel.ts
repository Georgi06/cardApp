import {User} from "../types/User";
import {UserDataInput} from "../types/UserDataInput";
import {UpdateUserData} from "../types/UpdateUserData";

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

    async findUser(id : number): Promise<User[]>{
        const [rows] = this.conn.execute(`SELECT * FROM users WHERE id = ?`, [id]);
        return rows;

    }
    async getUserCard(id : number): Promise<User[]>{
        const [rows] = this.conn.execute(`SELECT * FROM users JOIN cards ON users.first_name = cards.holder_first_name`, [id]);
        return rows;

    }

    async createUser(userDataInput: UserDataInput): Promise<boolean>{
        const userRole=2;
        const insertDataObject = [
            userDataInput.username,
            userDataInput.password,
            (userDataInput.email) ? userDataInput.email : null,
            (userDataInput.first_name) ? userDataInput.first_name : null,
            (userDataInput.last_name) ? userDataInput.last_name : null,
            (userRole) ? userRole : null
        ]

        await this.conn.execute("INSERT INTO users (username, password, email, first_name, last_name, role) VALUES (?,?,?,?,?,?)", insertDataObject)

        return true;
    }



    async createHashUser(userDataInput: UserDataInput): Promise<boolean>{
        const userRole = 2;  //role = user
        const passwordForHash = userDataInput.password.toString();
        const salt = bcrypt.genSalt(10); // 10 salt rounds
       let hashedPass = await bcrypt.hash(passwordForHash, parseInt(salt));


        // bcrypt.genSalt(this.saltRounds, function(err, salt) {
        //     // returns salt
        //    bcrypt.hash(passwordForHash, salt, function(err, hash) {
        //         // returns hash
        //        password = hash;
        //        console.log(hash);
        //     });
        // });


        const insertDataObject = [
            userDataInput.username,
            hashedPass,
            (userDataInput.email) ? userDataInput.email : null,
            (userDataInput.first_name) ? userDataInput.first_name : null,
            (userDataInput.last_name) ? userDataInput.last_name : null,
            (userRole) ? userRole : null
        ]

        console.log(insertDataObject)

        await this.conn.execute("INSERT INTO users (username, password, email, first_name, last_name, role) VALUES (?,?,?,?,?,?)", insertDataObject)

        return true;
    }


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

    public async updatePassword(username : string, updateUserData: UpdateUserData): Promise<boolean>{
        const passwordForHash = updateUserData.password.toString();
        const salt = bcrypt.genSalt(10); // 10 salt rounds
        let hashedPass = await bcrypt.hash(passwordForHash, parseInt(salt));


        await this.conn.execute(`UPDATE users SET password = '${hashedPass}' WHERE users.username = '${username}'`)
        return true;
    }

     async deleteUser(username: string): Promise<boolean> {
        await this.conn.execute("DELETE FROM users WHERE username = ?", [username])

        return true;
    }


}


