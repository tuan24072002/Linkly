import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/Users.model.js";
import { createToken } from "../utils/index.js";

export const signup = async (req, res) => {
    const { email, password, fullName } = req.body;
    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists, please use a different one"
            });
        }
        const idx = Math.floor(Math.random() * 100) + 1; // generate a number between 1-100
        const randomAvt = `https://avatar.iran.liara.run/public/${idx}`;
        const newUser = new User({
            fullName,
            email,
            password,
            profilePic: randomAvt
        });

        try {
            const payload = {
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            }
            await upsertStreamUser(payload);
            console.log(`Stream user created for ${newUser.fullName}`);
        } catch (error) {
            console.log("Error in creating stream user: ", error);
        }

        createToken(newUser, res);
        await newUser.save();
        newUser.password = undefined;
        res.status(201).json({
            success: true,
            data: { user: newUser },
            message: "User created successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        createToken(user, res);
        user.password = undefined;
        res.status(200).json({
            success: true,
            data: { user },
            message: "User logged in successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
}
export const onboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            fullName,
            bio,
            nativeLanguage,
            learningLanguage,
            location,
            isOnboarded: true
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            })
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
        } catch (error) {
            console.log("Error in updating stream user: ", error);
        }
        updatedUser.password = undefined;
        res.status(200).json({
            success: true,
            data: { user: updatedUser },
            message: "User onboarded successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export const getMe = (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    })
}