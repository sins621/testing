import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.string().min(1).max(3),
  email: z.email(),
})

export type FormSchemaType = z.infer<typeof formSchema>