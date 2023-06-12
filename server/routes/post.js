import { Router } from "express";
import { getFeedPost , getUserPosts, likePost } from "../controllers/post.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

/** READ */

router.get("/", verifyToken, getFeedPost);
router.get("/:userId/posts", verifyToken, getUserPosts);

/** UPDATE */

router.patch("/:id/like", verifyToken, likePost);

export default router;