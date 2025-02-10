'use client';
import Link from "next/link"
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { useRegister } from "@/hooks/register";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"
import styles from '../AuthLayout.module.scss';

interface FormData {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Signup() {
    const { isPending, isSuccess, mutate, isError, error } = useRegister();
    const schema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .regex(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Must contain alphanumeric and special characters",
      )
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<FormData>();

    const submitHandler = async (data: FormData) => {
        try {
            await schema.parse(data);
            mutate({
                email: data.email,
                password: data.password,
                fullname: data.fullname,
                username: data.username
            });
            if (isSuccess) {
                toast.success("Registration successfully !", { position: "top-right" });
                redirect("/signin");
            } else {
                error?.message
                    ? toast.error(error?.message, { position: "top-right" })
                    : toast.error("Failed to register", { position: "top-right" });
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
                <h1>Sign Up</h1>
                <p>Enter your information to create an account</p>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
        <div className={styles["grid-cols-2"]}>
          <div className={styles["input-group"]}>
            <Label htmlFor="fullname">Full name</Label>
            <Input id="fullname" placeholder="Max" {...register("fullname")} error={errors.fullname} />
          </div>
          <div className={styles["input-group"]}>
            <Label htmlFor="username">User name</Label>
            <Input id="username" placeholder="Robinson" {...register("username")} error={errors.username} />
          </div>
        </div>
        <div className={styles["input-group"]}>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" {...register("email")} error={errors.email} />
        </div>
        <div className={styles["input-group"]}>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} error={errors.password} />
        </div>
        <div className={styles["input-group"]}>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} error={errors.confirmPassword} />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          Create an account
        </Button>
        <Button variant="outline" disabled={isPending}>
          Continue with Google
        </Button>
      </form>
            <div className={styles["footer-section"]}>
                Already have an account?{" "}
                <Link href="/signin">
                    Sign in
                </Link>
            </div>
        </div>
    )
}
