import { z } from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, { message: "Your name is too short" }),
    username: z.string().min(2, { message: "Your username is too short" }),
    email: z.string().email(),
    password: z.string().min(2, { message: "Password must be at minimum 8 character long" })
  })

  export const SignInValidation = z.object({
      email: z.string().email(),
      password: z.string().min(2, { message: "Password must be at minimum 8 character long" })
    })