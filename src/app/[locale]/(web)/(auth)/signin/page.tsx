'use client';
import { useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import toast from 'react-hot-toast';
import styles from '../AuthLayout.module.scss';

interface FormData {
    email: string;
    password: string;
}

export default function Signin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const schema = z.object({
        email: z.string().email("Invalid email format").min(1),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<FormData>();

    const submitHandler = async (data: FormData) => {
        try {
            setLoading(true);
            await schema.parse(data);
            await signIn("credentials", { ...data, redirect: false, callbackUrl: "/dashboard" })
                .then((res) => {
                    if (res?.ok) {
                        router.push("/dashboard", { scroll: false });
                         toast.success("Login Successful", { position: "top-right" });
                    } else {
                        toast.error("Login Failed", { position: "top-right" });
                    }
                    setLoading(false);
                });
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
            <div className={styles["heading-section"]}>
                <h1>Sign In</h1>
                <p>
                    Enter your email below to login to your account
                </p>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className={styles["input-group"]}>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" {...register("email")} error={errors.email} />
                </div>
                <div className={styles["input-group"]}>
                    <div className={styles["password-group"]}>
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" {...register("password")} error={errors.password} />
                </div>
                <Button type="submit" loading={loading}>
                    Sign In
                </Button>
                <Button variant="outline">
                    Continue with Google
                </Button>
            </form>
            <div className={styles["footer-section"]}>
                Don&apos;t have an account?{" "}
                <Link href="/signup">
                    Sign up
                </Link>
            </div>
        </div>
    )
}
