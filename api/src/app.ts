
import 'dotenv/config';
import express, { NextFunction, Request, Response } from "express";
import morgan from 'morgan'
import JobRouter from "./routes/jobs"
import createHttpError, { isHttpError } from 'http-errors';
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use("/api/job", JobRouter)
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Unknown error has occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        errorMessage = error.message;
        statusCode = error.status
    }
    res.status(statusCode).json({
        error: errorMessage
    })
})

export default app 