import { Prisma } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";

export default function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
){
    const errorCath = error

    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

    return res.status(500).json({
        success: false,
        message: errorCath?.message ?? "Someting went wrong"
    })
}