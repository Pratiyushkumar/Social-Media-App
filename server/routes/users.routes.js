/**-------import libraries-------*/
import express from "express";

/**-------import files -------*/
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.controller.js";

/**-------users routes -------*/
const router = express.Router();

/**-------Read -------*/
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/**-------Update -------*/
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
