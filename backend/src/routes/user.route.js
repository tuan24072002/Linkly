import express from "express";
import {
    getRecommendedUsers,
    getMyFriends,
    friendRequest,
    acceptFriendRequest,
    getFriendRequests,
    getOutgoingFriendRequests
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply middleware all routes
router.use(protectRoute);
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", friendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
// router.put("/friend-request/:id/reject", rejectFriendRequest); Comming soon!
router.get("/friend-request", getFriendRequests);
router.get("/outgoing-friend-request", getOutgoingFriendRequests);
export default router;