import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3)
});

export const loginUserSchema = z.object({
  email:z.string().min(2),
  password:z.string().min(2)
})

export const RoomloginSchema = z.object({
  slug :z.string().min(3).max(30)
})

// export type UserSchema = z.infer<typeof userSchema>;
