"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SignUpFormSchema } from "@/schemas";
import { useState } from "react";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { login, register } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/store";

function SignUp() {
  const router = useRouter();
  const { setUserData } = useStore();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    try {
      const { error, success, user } = await register(values);

      if (error) {
        toast.error(error);
        setError(error);
      }

      if (success && user) {
        form.reset();
        toast.success(success);
        setSuccess(success);
      }
      router.push("/sign-in");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="sm:w-[380px] max-w-[380px] w-full px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <div>
            <h2 className="text-3xl font-bold">Register</h2>
            <p className="text-lg text-accent-foreground/65 mt-2">
              to continue to the application
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Wick" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John_Wick" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johnwick@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccess message={success} />
          <FormError message={error} />
          <Link
            className="text-sm font-medium group flex gap-1.5 items-center"
            href="/sign-in"
          >
            <p>Have an account?</p>
            <span className=" group-hover:underline group-hover:text-indigo-500 ">
              Sign in
            </span>
          </Link>
          <Button
            disabled={isSubmitting || !isValid}
            type="submit"
            className="w-full"
          >
            <Loader2
              className={cn(
                "h-5 w-5 mr-2 animate-spin",
                !isSubmitting && "hidden"
              )}
            />
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUp;
