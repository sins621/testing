"use server"

import { db } from "./index";
import { usersTable } from "@/db/schema";
import { FormSchemaType } from "./zod";

export async function createUser(values: FormSchemaType) {
  await db.insert(usersTable).values({
    name: values.name,
    age: parseInt(values.age),
    email: values.email
  })
}

export async function getUsers() {
  const users = await db.select().from(usersTable)
  return users
}