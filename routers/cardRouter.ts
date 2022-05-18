import {Router} from "express";
import {createCard, deleteCard, getCard, getCards, getUserCard, updateCard} from "../controllers/cardControllers";
import {authenticateToken} from "../middlewares/authHeader";
import {deleteUser} from "../controllers/userControllers";
import {userRoutes} from "./userRouter";


export const cardRoutes = Router();

cardRoutes.post("/cards", createCard);
cardRoutes.get("/cards", authenticateToken, getCards);
cardRoutes.put("/cards/:username", updateCard);
cardRoutes.delete("/cards/:id", deleteCard);
userRoutes.get("/cards/:username", authenticateToken, getUserCard);
cardRoutes.get("/cards/:id", getCard);
