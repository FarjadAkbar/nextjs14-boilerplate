'use client';
import { useState } from "react";
import Link from "next/link"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"
import { useForgotPassword } from "@/hooks/forgot-password";
import { redirect } from "next/navigation";
import styles from '../AuthLayout.module.scss';

interface FormData {
    email: string;
}

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const schema = z.object({
        email: z.string().email("Invalid email format").min(1),
    });
    const { isSuccess, mutate, isError, error } = useForgotPassword();

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
            mutate(data);

            if (isSuccess) {
                toast.success("Verification link send over email", {
                  position: "top-right",
                });
                redirect("/signin");
            } else if (isError) {
            error?.message
                ? toast.error(error?.message, { position: "top-right" })
                : toast.error("Operation Failed", { position: "top-right" });
            }
            setLoading(false);
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
                <h1>Forgot Password</h1>
                <p>
                    If you forgot your password you can reset it here
                </p>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className={styles["input-group"]}>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" {...register("email")} error={errors.email} />
                </div>

                <Button type="submit" disabled={loading}>
                    {
                        loading && (
                            <Loader2 className="animate-spin" />
                        )
                    }
                    Reset Password
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
