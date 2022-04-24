import {promises} from "fs";
import {Card} from "../types/Card";
import {Request, Response} from "express";
import {UpdateCardData} from "../types/UpdateCardData";
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

export class CardModel {

    //database connection
    private conn;

    constructor() {
        const pool = mysql.createPool({host:'localhost', user: 'root', database: 'cardapp'});
        this.conn = pool.promise();
    }

    async getCards(): Promise<Card[]>{
        const [rows] = await this.conn.query("SELECT * FROM cards");
        return rows;

    }

    async findCard(id : number): Promise<Card[]>{
        const [rows] = this.conn.execute(`SELECT * FROM cards WHERE id = ?`, [id]);
        return rows;

    }

    async createCard(cardDataInput: Card): Promise<boolean>{
        const insertDataObject = [
            cardDataInput.card_number,
            cardDataInput.holder_first_name,
            cardDataInput.holder_last_name,
            cardDataInput.valid_date,
            cardDataInput.ccv2,
        ]
        await this.conn.execute("INSERT INTO users (username, password, email, first_name, last_name ) VALUES (?,?,?,?,?)", insertDataObject)

        return true;
    }


    public async updateCard(id : number, updateCardData: UpdateCardData): Promise<boolean>{
        const updateCardDataArray = Object.entries(updateCardData);
        let setStatement = "";
        let preparedStatementData = [];
        for (let i = 0; i < updateCardDataArray.length; i++){
            setStatement += `${updateCardDataArray[i][0]} = ?`
            setStatement += (i + 1 !== updateCardDataArray.length) ? "," : " ";
            preparedStatementData.push(updateCardDataArray[i][1])
        }
        console.log(setStatement);
        preparedStatementData.push(id);
        await this.conn.execute(`UPDATE cards SET ${setStatement} WHERE id = ?`, preparedStatementData)
        return true;
    }

    async deleteCard(id: number): Promise<boolean> {
        await this.conn.execute("DELETE FROM cards WHERE id = ?", [id])

        return true;
    }


}
