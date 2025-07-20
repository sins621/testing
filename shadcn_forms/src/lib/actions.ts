"use server"

import { db } from "./index";
import { usersTable } from "@/db/schema";
import { FormSchemaType } from "./zod";

export default async function createUser(values: FormSchemaType) {
  await db.insert(usersTable).values({
    name: values.name,
    age: parseInt(values.age),
    email: values.email
  })
}