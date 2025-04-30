export const errorHandler = (error, req, res, next)=> {
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({
        status,
        message,
    });
};