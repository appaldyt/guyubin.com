import type { Request, Response, NextFunction } from "express"
import { signInSchema, signUpSchema } from "../utils/schema/user"
import fs from "node:fs"
import * as userService from "../services/userService"

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "Upload photo is required",
            })
        }
        
        const parse = signUpSchema.safeParse(req.body)

        if(!parse.success) {
            const errorMassage = parse.error.issues.map((err) => '${err.path} - ${err.message}')

            fs.unlinkSync(req.file.path)

            return res.status(400).json({
                success: false,
                message: 'Validation error',
                detail: errorMassage,
            })

        }

        const newUser = await userService.signup(parse.data, req.file)

        return res.json({
            success: true,
            message: 'Creiate user Successy',
            data: newUser,
        })
    }catch (error) {
        next(error)
    }
}

export const signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parse = signInSchema.safeParse(req.body)

        if(!parse.success) {
            const errorMassage = parse.error.issues.map((err) => '${err.path} - ${err.message}')

            return res.status(400).json({
                success: false,
                message: 'Validation error',
                detail: errorMassage,
            })

        }

        const data = await userService.signIn(parse.data)

        return res.json({
            success: true,
            message: 'Sign in Success',
            data,
        })
    } catch (error) {
        next(error)
    }
}