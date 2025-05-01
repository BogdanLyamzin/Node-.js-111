import { 
    registerUser, 
    verifyUser, 
    loginUser, 
    refreshUser, 
    logoutUser, 
    getGoogleLink,
    loginOrSignupWithGoogle
} from "../services/auth.js";

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

export const verifyController = async(req, res)=> {
    await verifyUser(req.query.token);

    res.json({
        message: "Email verified!"
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

export const getGoogleOAuthLinkController = (req, res) => {
    const oauthLink = getGoogleLink();

    res.json({
        status: 200,
        message: "Google OAuth link retrieved successfully!",
        data: {
            link: oauthLink,
        }
    });
};

export const signUpOrLoginWithGoogleController = async (req, res) => {
    const { code } = req.body;
    const session = await loginOrSignupWithGoogle(code);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "User logged in with google OAuth!",
        data: {
            accessToken: session.accessToken,
        }
    });
};