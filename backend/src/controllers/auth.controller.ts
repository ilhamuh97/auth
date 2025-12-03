import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from "bcryptjs";

import { User } from '../models/user.model';
import { generateVerificationToken } from '../utils/generateVerificationToken';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/mails';
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
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        await user.save({ session });

        //JWT
        generateTokenAndSetCookie(res, user._id);

        await session.commitTransaction();

        // Send email AFTER committing
        await sendVerificationEmail(user.email, verificationToken);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: sanitizeUser(user),
        });

    } catch (error: any) {
        console.log("Error in signup controller:", error);

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
            message: "Email verified successfully"
        });


    } catch (error: unknown) {
        console.error("Error in verifyEmail controller:", error);

        await session.abortTransaction();
        return res.status(400).json({
            success: false,
            message: (error as Error).message || "Email verification failed"
        });
    } finally {
        session.endSession();
    }
}


export const login = async (req: Request, res: Response) => {
    res.send("login route");
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("jwtToken", { httpOnly: true, secure: true, sameSite: 'strict' });
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
}
