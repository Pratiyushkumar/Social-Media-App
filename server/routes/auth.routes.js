/**-------import libraries-------*/
import express from "express";

/**-------import files -------*/
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);

export default router;
