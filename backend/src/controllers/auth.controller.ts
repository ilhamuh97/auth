import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from '../utils/generateVerificationToken';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            });
        }

        const hashedPassword: string = await bcryptjs.hash(password, 10);
        const verificationToken: String = generateVerificationToken();


        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours

        })
        await user.save();

        //JWT
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user,
                password: undefined
            }
        })
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message })
        console.log(error)
    }
}

export const login = async (req: Request, res: Response) => {
    res.send("login route");
}

export const logout = async (req: Request, res: Response) => {
    res.send("logout route");
}