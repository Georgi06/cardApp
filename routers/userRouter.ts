import {Router} from "express";
import {getUser, createUser, updateUser, deleteUser, getAllUsers, Login} from "../controllers/userControllers";

export const userRoutes = Router();

userRoutes.post("/users", createUser);
userRoutes.get("/users", getAllUsers);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
userRoutes.get("/users/:id", getUser);
userRoutes.post("/login", Login);





