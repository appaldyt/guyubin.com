import {z} from 'zod'

export const signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export type SignupValues = z.infer<typeof signUpSchema>