import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from "bcryptjs";
import crypto from 'crypto';

import { User } from '../models/user.model';
import { generateVerificationToken } from '../utils/generateVerificationToken';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';
import { sendVerificationEmail, sendWelcomeEmail, sendForgotPasswordEmail, sendResetPasswordSuccessEmail } from '../mailtrap/mails';
import { sanitizeUser } from '../utils/user';

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({ email }).session(session);

        if (userAlreadyExists) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword: string = await bcryptjs.hash(password, 10);
        const verificationToken: string = generateVerificationToken();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });

        await user.save({ session });

        //JWT
        generateTokenAndSetCookie(res, user._id);

        await session.commitTransaction();

        await sendVerificationEmail(user.email, verificationToken);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: sanitizeUser(user),
        });
    } catch (error: any) {
        console.error("Error in signup controller:", error);

        await session.abortTransaction();

        return res.status(400).json({
            success: false,
            message: error.message || "Signup failed"
        });
    } finally {
        session.endSession();
    }
};


export const verifyEmail = async (req: Request, res: Response) => {
    const { code } = req.body;
    const userId = (req as any).user._id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const user = await User.findOne({
            _id: userId,
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: new Date() }
        }).session(session);

        if (!user) {
            throw new Error("Invalid or expired verification token");
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save({ session });

        await sendWelcomeEmail(user.email, user.name);

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: sanitizeUser(user)
        });
    } catch (error: unknown) {
        console.error("Error in verifyEmail controller:", error);

        await session.abortTransaction();
        return res.status(400).json({
            success: false,
            message: (error as Error).message || "Email verification failed",

        });
    } finally {
        session.endSession();
    }
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        //JWT
        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();

        await user.save({ session });
        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: sanitizeUser(user),
        });
    } catch (error: any) {
        console.error("Error in login controller:", error);
        await session.abortTransaction();
        return res.status(400).json({
            success: false,
            message: error.message || "Login failed"
        });
    } finally {
        session.endSession();
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        if (!email) {
            throw new Error("Email is required");
        }

        const user = await User.findOne({ email }).select("-password");

        if (!user) {
            throw new Error("User not found");
        }

        const forgotPasswordToken: string = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = forgotPasswordToken;
        user.resetPasswordExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

        const resetTokenLink = `${process.env.CLIENT_URL}/reset-password?token=${forgotPasswordToken}&email=${email}`;

        await user.save({ session });
        await session.commitTransaction();

        await sendForgotPasswordEmail(user.email, resetTokenLink);

        return res.status(200).json({
            success: true,
            message: "Forgot password email sent successfully"
        });
    } catch (error: any) {
        console.error("Error in forgotPassword controller:", error);

        await session.abortTransaction();
        return res.status(400).json({
            success: false,
            message: error.message || "Forgot password failed"
        });
    } finally {
        session.endSession();
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token, email } = req.query;
    const { newPassword } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!token || !newPassword) {
            throw new Error("Token and new password are required");
        }

        const user = await User.findOne({
            email: email,
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: new Date() }
        }).select("+password").session(session);

        if (!user) {
            throw new Error("Invalid or expired reset password token");
        }

        const isPasswordValid = await bcryptjs.compare(newPassword, user.password);
        if (isPasswordValid) {
            throw new Error("New password must be different from the old password");
        }

        const hashedPassword: string = await bcryptjs.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save({ session });
        await session.commitTransaction();

        await sendResetPasswordSuccessEmail(user.email, user.name);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error: any) {
        console.error("Error in resetPassword controller:", error);
        await session.abortTransaction();
        return res.status(400).json({
            success: false,
            message: error.message || "Reset password failed"
        });
    } finally {
        session.endSession();
    }
};

export const checkAuth = async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(userId).session(session);

        if (!user) {
            throw new Error("User not found");
        }

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            user: sanitizeUser(user),
        });
    } catch (error: any) {
        console.error("Error in checkAuth controller:", error);
        await session.abortTransaction();
        return res.status(400).json({
            success: false,
            message: error.message || "Authentication check failed"
        });
    } finally {
        session.endSession();
    }
};


export const logout = async (req: Request, res: Response) => {
    res.clearCookie("jwtToken", { httpOnly: true, secure: true, sameSite: 'strict' });
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
}
