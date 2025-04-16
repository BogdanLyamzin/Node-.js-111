import { registerUser, loginUser } from "../services/auth.js";

export const registerController = async(req, res)=> {
    await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully register user",
    });
};

export const loginController = async(req, res)=> {
    const session = await loginUser(req.body);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUnitl,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUnitl,
    });

    res.json({
        status: 200,
        message: "Login successfully",
        data: {
            accessToken: session.accessToken,
        }
    });
};