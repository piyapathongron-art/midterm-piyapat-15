import {z} from 'zod'

export const registerValidator =z.object({
    username: z.string().min(5,'Username must be atlest 5 letters'),
    password: z.string().min(5,'Password must be atleast 5 letters'),
    confirmpassword: z.string().min(5,'Password must be atleast 5 letters')
})