import { IUser } from "../models/user.model";

export const sanitizeUser = (user: IUser) => {
    const { password, ...rest } = user.toObject();
    return rest;
};