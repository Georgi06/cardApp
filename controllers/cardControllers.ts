import {Request, Response} from "express";
import  {CardModel} from "../models/CardModel";
const bcrypt = require('bcrypt');
import {Card} from "../types/Card";
import {UpdateCardData} from "../types/UpdateCardData";
import {UserModel} from "../models/UserModel";

const saltRounds = 10;

//create
export const createCard= async (req: Request, res: Response) => {
    let CardData: Card = req.body;


    if (!CardData.card_number) {
        return res.send({
            status: 400,
            message: "Invalid Card Data"
        })
    }

    const newCard = new CardModel();
    await newCard.createCard(CardData);

    res.send({
        status: 200,
        message: "Card created"
    })

}

//read
export const getCards = async (req: Request, res: Response) => {
    let cards: Card[] = await new CardModel().getCards();
    res.send(cards);
}

export const getCard = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let card: Card[] = await new CardModel().findCard(id);
    console.log(card);
    res.send(card);

}
export const getUserCard = async (req: Request, res: Response) => {
    let username = req.params.username;
    let userCard = await new CardModel().getLoggedUserCard(username);

    res.send(userCard);

}

//update
export const updateCard= async (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let updateCardData: UpdateCardData = req.body;
    const userModel = new CardModel();
    await userModel.updateCard(id, updateCardData);

    res.send({
        status: 200,
        message: `Card with id:${id} updated`
    })
}

//delete
export const deleteCard = async (req: Request, res: Response)=> {
    let id = Number(req.params.id);

    const deleteCard = await new CardModel().deleteCard(id);

    res.send({
        status: 200,
        message: `User with id: ${id} was deleted`
    })
}







