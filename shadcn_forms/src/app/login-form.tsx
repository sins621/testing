"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUser } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSchemaType, formSchema } from "@/lib/zod";
import { User } from "@/db/schema";
import { useFormStore } from "@/lib/store";
import { useEffect } from "react";

export default function LoginForm(firstUser: User) {
  const { formData, updateFormData, resetFormData } = useFormStore();
  
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData.name || firstUser?.name || "",
      age: formData.age || firstUser?.age?.toString() || "",
      email: formData.email || firstUser?.email || ""
    }
  })

  useEffect(() => {
    if (formData.name || formData.age || formData.email) {
      form.reset({
        name: formData.name || firstUser?.name || "",
        age: formData.age || firstUser?.age?.toString() || "",
        email: formData.email || firstUser?.email || ""
      });
    }
  }, [formData, firstUser, form]);

  async function onSubmit(values: FormSchemaType) {
    await createUser(values)
    form.reset()
    resetFormData()
  }

  return (
    <div className="w-md mx-auto flex flex-col gap-4 p-4">
      {Object.entries(form.formState.errors).length > 0 && (
        <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive text-sm space-y-1">
          {Object.entries(form.formState.errors).map(([fieldName, error]) => (
            <p key={fieldName}>
              {fieldName}: {error?.message?.toString()}
            </p>
          ))}
        </div>
      )}
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="name" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      updateFormData('name', e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="age" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      updateFormData('age', e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="email" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      updateFormData('email', e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}