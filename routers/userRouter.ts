import {Router} from "express";
import {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    Login,
    updatePassword
} from "../controllers/userControllers";
import {authenticateToken} from "../middlewares/authHeader";

export const userRoutes = Router();

userRoutes.post("/users", createUser);
userRoutes.get("/users",authenticateToken, getAllUsers);
//userRoutes.put("/users/:id", updateUser);
userRoutes.put("/users/changePassword/:username", updatePassword);
userRoutes.delete("/users/:username", authenticateToken, deleteUser);
userRoutes.get("/users/:id",authenticateToken, getUser);
userRoutes.post("/login", Login);





