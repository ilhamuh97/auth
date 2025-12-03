import jwt from "jsonwebtoken"
import { Types } from "mongoose"

export const generateTokenAndSetCookie = (res: any, userId: Types.ObjectId) => {
    const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET || "", { expiresIn: "7d" });

    res.cookie("jwtToken", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return jwtToken;
}