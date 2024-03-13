import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authControllers.js";

const router = express.Router();

//register user
router.post("/register", registerController);

//login user
router.post("/login", loginController);

export default router;
