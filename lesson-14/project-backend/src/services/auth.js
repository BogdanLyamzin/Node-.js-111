import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import {randomBytes} from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
import Handlebars from "handlebars";
import jwt from "jsonwebtoken";

import UserCollection from "../db/models/User.js";
import SessionCollection from '../db/models/Session.js';

import {sendEmail} from "../utils/sendEmail.js";
import {getEnvVar} from "../utils/getEnvVar.js";

import { accessTokenLifeTime, refreshTokenLifeTime } from "../constants/auth.js";
import { TEMPLATES_DIR } from "../constants/index.js";

const createSession = ()=> {
    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");
    const accessTokenValidUntil = Date.now() + accessTokenLifeTime;
    const refreshTokenValidUnitl = Date.now() + refreshTokenLifeTime;

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUnitl,
    };
};

export const findSession = query => SessionCollection.findOne(query);

export const findUser = query => UserCollection.findOne(query);

const verifyEmailPath = path.join(TEMPLATES_DIR, "verify-email.html");
const appDomain = getEnvVar("APP_DOMAIN");
const jwtSecret = getEnvVar("JWT_SECRET");

export const registerUser = async payload => {
    const {email, password} = payload;
    const user = await findUser({email});

    if(user) {
        throw createHttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = await UserCollection.create({...payload, password: hashPassword});

    const token = jwt.sign({email}, jwtSecret, {
        expiresIn: "24h"
    });

    const templateSource = await fs.readFile(verifyEmailPath, "utf-8");
    const template = Handlebars.compile(templateSource);
    const html = template({
        verifyLink: `${appDomain}/auth/verify?token=${token}`
    });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html,
    };

    await sendEmail(verifyEmail);

    return newUser;
};

export const verifyUser = token => {
    try {
        const {email} = jwt.verify(token, jwtSecret);
        return UserCollection.findOneAndUpdate({email}, {verify: true});
    }
    catch(error) {
        throw createHttpError(401,error.message);
    }
};

export const loginUser = async payload => {
    const {email, password} = payload;
    const user = await findUser({email});
    if(!user) {
        throw createHttpError(401, "Email or password invalid");
    }

    if(!user.verify) {
        throw createHttpError(401, "Email not verified");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw createHttpError(401, "Email or password invalid");
    }

    await SessionCollection.findOneAndDelete({userId: user._id});

    const session = createSession();

    return SessionCollection.create({
        userId: user._id, 
        ...session,
    });
};

export const refreshUser = async ({refreshToken, sessionId})=> {
    const session = await findSession({refreshToken, _id: sessionId});
    if(!session) {
        throw createHttpError(401, "Session not found");
    }

    if(session.refreshTokenValidUnitl < Date.now()) {
        await SessionCollection.findOneAndDelete({_id: session._id});
        throw createHttpError(401, "Session token expired");
    }

    await SessionCollection.findOneAndDelete({_id: session._id});

    const newSession = createSession();

    return SessionCollection.create({
        userId: session.userId, 
        ...newSession,
    });
};

export const logoutUser = sessionId => SessionCollection.deleteOne({_id: sessionId});