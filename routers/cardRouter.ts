import {Router} from "express";
import {createCard, deleteCard, getCard, getCards, updateCard} from "../controllers/cardControllers";


export const cardRoutes = Router();

cardRoutes.post("/cards", createCard);
cardRoutes.get("/cards", getCards);
cardRoutes.put("/cards/:id", updateCard);
cardRoutes.delete("/cards/:id", deleteCard);
cardRoutes.get("/cards/:id", getCard);
