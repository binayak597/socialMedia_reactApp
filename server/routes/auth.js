import { Router } from "express";
import { loginUser } from "../controllers/auth.js";
import { authentication }  from "../middlewares/auth.js";

const router = Router();

router.post("/login", authentication, loginUser);

export default router;
