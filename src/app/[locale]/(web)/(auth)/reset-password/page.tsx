'use client';
import Link from "next/link"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"
import { redirect, useSearchParams } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { useResetPassword } from "@/hooks/reset-password";
import styles from '../AuthLayout.module.scss';

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
    <div className={styles["container"]}>
      <div className={styles["header-section"]}>
        <h1>Create New Password</h1>
        <p>
          Set your new password so you can login
        </p>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={styles["input-group"]}>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} error={errors.password} />
        </div>

        <div className={styles["input-group"]}>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} error={errors.confirmPassword} />
        </div>

        <Button type="submit" disabled={isPending}>
          {
            isPending && (
              <Loader2 className="animate-spin" />
            )
          }
          Change Password
        </Button>
      </form>
      <div className={styles["footer-section"]}>
        Know your password?{" "}
        <Link href="/signin">
          Sign in
        </Link>
      </div>
    </div>
  )
}
