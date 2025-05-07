import express from "express";
import {
    getMe,
    login,
    logout,
    onboard,
    signup
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// router.post("/forgot-password", forgotPassword); Comming soon!
router.post("/onboard", protectRoute, onboard);
router.get("/me", protectRoute, getMe);

export default router;