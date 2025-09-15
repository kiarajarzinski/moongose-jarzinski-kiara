import { Router } from "express";
import { validator } from "../middlewares/validator.js";
import { createUserValidator, updateUserValidator } from "../middlewares/validatios/user.validator.js";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/user.controllers.js";

export const userRoutes = Router();

userRoutes.post("/users",createUserValidator, validator, createUser);
userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/:id", getUserById);
userRoutes.put("/users/:id",updateUserValidator,validator, updateUser);
userRoutes.delete("/users/:id", deleteUser);