'use client';
import { useState } from "react";
import Link from "next/link"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"
import { useForgotPassword } from "@/hooks/forgot-password";
import { redirect } from "next/navigation";

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
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Forgot Password</h1>
                <p className="text-balance text-muted-foreground">
                    If you forgot your password you can reset it here
                </p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit(submitHandler)}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p className="text-red-500 pt-1 text-xs">{errors.email.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {
                        loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )
                    }
                    Reset Password
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
