import { z } from 'zod';

const defaultAuthSchema = {
    email: z.string().email(),
    password: z.string().min(5).max(20),
};

export const loginFormSchema = z.object(defaultAuthSchema);

export const signupFormSchema = z.object({
    ...defaultAuthSchema,
    username: z.string().min(5).max(20),
});
