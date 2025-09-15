import { Router } from "express";
import {
  createUser
} from "../controllers/user.controllers.js";

export const userRoutes = Router();

userRoutes.post("/users", createUser);

