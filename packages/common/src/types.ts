import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
});

// export type UserSchema = z.infer<typeof userSchema>;
