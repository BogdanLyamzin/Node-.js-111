import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import {randomBytes} from "node:crypto";

import UserCollection from "../db/models/User.js";
import SessionCollection from '../db/models/Session.js';

import { accessTokenLifeTime, refreshTokenLifeTime } from "../constants/auth.js";

export const registerUser = async payload => {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});

    if(user) {
        throw createHttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    return await UserCollection.create({...payload, password: hashPassword});
};

export const loginUser = async payload => {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});
    if(!user) {
        throw createHttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw createHttpError(401, "Email or password invalid");
    }

    await SessionCollection.findOneAndDelete({userId: user._id});

    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");

    return SessionCollection.create({
        userId: user._id, 
        accessToken,
        refreshToken,
        accessTokenValidUntil: Date.now() + accessTokenLifeTime,
        refreshTokenValidUnitl: Date.now() + refreshTokenLifeTime,
    });
};