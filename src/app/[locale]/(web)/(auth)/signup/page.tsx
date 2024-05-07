'use client';
import Link from "next/link"
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegister } from "@/hooks/register";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"

interface FormData {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Signup() {
    const { isPending, isSuccess, mutate, isError, error } = useRegister();
    const schema = z.object({
        fullname: z.string(),
        username: z.string(),
        email: z.string().email("Invalid email format").min(1),
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
            mutate({
                email: data.email,
                password: data.password,
                fullname: data.fullname,
                role: 2,
                username: data.username,
                phoneNumber: "92334444",
                university: {
                    id: 1
                }
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
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your information to create an account
                </p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit(submitHandler)}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="full-name">Full name</Label>
                        <Input id="full-name" placeholder="Max" required {...register('fullname', { required: 'Name is required' })} />
                        {errors.fullname && <p className="text-red-500 pt-1 text-xs">{errors.fullname.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="user-name">User name</Label>
                        <Input id="user-name" placeholder="Robinson" required  {...register('username', { required: 'User Name is required' })} />
                        {errors.username && <p className="text-red-500 pt-1 text-xs">{errors.username.message}</p>}
                    </div>
                </div>
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
                    Create an account
                </Button>
                <Button variant="outline" className="w-full" disabled={isPending}>
                    Continue with Google
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="underline">
                    Sign in
                </Link>
            </div>
        </div>
    )
}
