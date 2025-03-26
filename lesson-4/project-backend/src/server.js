import express from "express";
import cors from "cors";
import pino from "pino-http";
import "dotenv/config";

export const startServer = ()=> {
    const app = express();

    app.use(cors());
    app.use(express.json());
    // app.use(pino({
    //     transport: {
    //         target: "pino-pretty"
    //     }
    // }));

    app.get("/", (req, res)=> {
        res.json({
            message: "Server start successfully"
        });
    });

    app.use((req, res)=> {
        res.status(404).json({
            message: `${req.url} not found`
        });
    });

    app.use((error, req, res, next)=> {
        res.status(500).json({
            message: error.message,
        });
    });
    console.log(process.env.PORT);
    const port = Number(process.env.PORT);

    app.listen(port, ()=> console.log(`Server running on ${port} port`));
};