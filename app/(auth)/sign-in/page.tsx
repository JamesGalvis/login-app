"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "sonner";
import { login } from "@/actions/auth";
import { SignInFormSchema } from "@/schemas";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/store";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();
  const { setUserData } = useStore();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    try {
      const { error, success, user } = await login(values);

      if (error) {
        toast.error(error);
        setError(error);
        form.reset();
      }

      if (success && user) {
        form.reset();
        toast.success(success);
        setSuccess(success);

        setUserData({
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
        });

        router.push("/");
      }
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
            <h2 className="text-3xl font-bold">Login</h2>
            <p className="text-lg text-accent-foreground/65 mt-2">
              to continue to the application
            </p>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John Wick" {...field} />
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
            href="/sign-up"
          >
            <p>Do not have an account?</p>
            <span className=" group-hover:underline group-hover:text-indigo-500 ">
              Sign up
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

export default SignIn;
