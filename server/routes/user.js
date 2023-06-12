import { Router } from "express";
import { getUser, getUserFriends, addRemoveFriends } from "../controllers/user.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

/** READ */

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/** UPDATE */

router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;
