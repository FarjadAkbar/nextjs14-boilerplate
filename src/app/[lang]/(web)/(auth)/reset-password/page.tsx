'use client';
import Link from "next/link"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"
import { redirect, useSearchParams } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useResetPassword } from "@/hooks/reset-password";

interface FormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const Params = useSearchParams();
  const hash = Params.get("hash");

  const { isPending, isSuccess, mutate, isError, error } = useResetPassword();
  const schema = z.object({
    password: z.string().regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "Must contain at alphanumeric and special characters").min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters")
  }).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>();

  const submitHandler = async (data: FormData) => {
    try {
      await schema.parse(data);
      mutate({ ...data, hash: hash });
      if (isSuccess) {
        toast.success("Password changed successfully !", { position: "top-right" });
        redirect("/signin");
      } else if (isError) {
        error?.message
          ? toast.error(error?.message, { position: "top-right" })
          : toast.error("Operation Failed", { position: "top-right" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set Zod errors to the form state
        error.errors.forEach((err) => {
          if (err.path) {
            setError(err.path[0] as keyof FormData, {
              type: "manual",
              message: err.message,
            });
          }
        });
      }
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Create New Password</h1>
        <p className="text-balance text-muted-foreground">
          Set your new password so you can login
        </p>
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit(submitHandler)}>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required  {...register('password', { required: 'Password is required' })} />
          {errors.password && <p className="text-red-500 pt-1 text-xs">{errors.password.message}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" required  {...register('confirmPassword', { required: 'Confirm Password is required' })} />
          {errors.confirmPassword && <p className="text-red-500 pt-1 text-xs">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {
            isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )
          }
          Change Password
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Know your password?{" "}
        <Link href="/signin" className="underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}
