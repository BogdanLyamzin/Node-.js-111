import { registerUser, loginUser, refreshUser, logoutUser } from "../services/auth.js";

const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUnitl,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUnitl,
    });
};

export const registerController = async(req, res)=> {
    await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully register user",
    });
};

export const loginController = async(req, res)=> {
    const session = await loginUser(req.body);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Login successfully",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const refreshController = async(req, res)=> {
    const session = await refreshUser(req.cookies);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Session successfullt refresh",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const logoutController = async(req, res)=> {
    if(req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
};