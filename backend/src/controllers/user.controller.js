import User from "../models/Users.model.js";
import FriendRequest from "../models/FriendRequest.model.js";

export const getRecommendedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = req.user;
        const incomingRequests = await FriendRequest.find({ recipient: userId }).select("sender recipient");
        const incomingRequestIds = incomingRequests.map(req => req.sender);

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: userId } },
                { _id: { $nin: user.friends } },
                { _id: { $nin: incomingRequestIds } },
                { isOnboarded: true }
            ]
        }).limit(5).select("-password");

        return res.status(200).json({
            success: true,
            data: recommendedUsers
        });
    } catch (error) {
        console.log(`Error in getRecommendedUsers: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export const getMyFriends = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User
            .findById(userId)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        return res.status(200).json({
            success: true,
            data: user.friends
        });
    } catch (error) {
        console.log(`Error in getMyFriends: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export const friendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const recipientId = req.params.id;

        if (userId === recipientId) {
            return res.status(400).json({
                success: false,
                message: "You cannot send friend request to yourself"
            })
        }
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({
                success: false,
                message: "Recipient not found"
            })
        }
        if (recipient.friends.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "You are already friends with this user"
            })
        }
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: userId, recipient: recipientId },
                { sender: recipientId, recipient: userId }
            ]
        })
        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "Friend request already sent"
            })
        }
        const friendRequest = new FriendRequest({
            sender: userId,
            recipient: recipientId
        })
        await friendRequest.save();
        return res.status(201).json({
            success: true,
            data: { friendRequest },
            message: "Friend request sent successfully"
        })
    } catch (error) {
        console.log(`Error in friendRequest: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export const acceptFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const requestId = req.params.id;
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({
                success: false,
                message: "Friend request not found"
            })
        }
        if (friendRequest.recipient.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to accept this friend request"
            })
        }
        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each user to the other's friends array
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });
        res.status(200).json({
            success: true,
            message: "Friend request accepted"
        })
    } catch (error) {
        console.log(`Error in acceptFriendRequest: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const inCommingReqs = await FriendRequest
            .find({ recipient: userId, status: "pending" })
            .populate("sender", "fullName profilePic nativeLanguage learningLanguage");
        const acceptedReqs = await FriendRequest
            .find({ sender: userId, status: "accepted" })
            .populate("recipient", "fullName profilePic createdAt");

        return res.status(200).json({
            success: true,
            data: { inCommingReqs, acceptedReqs }
        })
    } catch (error) {
        console.log(`Error in getFriendRequests: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export const getOutgoingFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const outgoingReqs = await FriendRequest
            .find({ sender: userId, status: "pending" })
            .populate("recipient", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json({
            success: true,
            data: outgoingReqs
        })
    } catch (error) {
        console.log(`Error in getOutgoingFriendRequests: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}