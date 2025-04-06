/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import service from "@/service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validatePasswords = () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validatePasswords()) {
            return;
        }

        try {
            await service.appWriteService.registration(name, email, password);
            toast.success(`Sign Up Successful`);
            router.push("/login");



        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Request failed with status code 409") {
                    toast.error('Sign Up Failed: Email already exists');

                }
            } else {
                toast.error('Sign Up Failed: An unknown error occurred');
            }
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const res = await service.appWriteService.loginWithGoogle();
            localStorage.setItem("userId", res.$id);
        } catch (error) {
            toast.error("Google login failed");
            console.error("Google Login Error:", error);
        }
    };

    return (
        <div className={cn(" flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 ">
                <CardContent className="grid p-0 md:grid-cols-2">

                    <div className="relative hidden md:flex justify-center items-center">
                        <img
                            src="/assets/signup.png"
                            alt="Image"
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>



                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Create an account</h1>
                                <p className="text-muted-foreground text-balance">
                                    Join SoulSync and start your journey
                                </p>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={validatePasswords}
                                />
                                {passwordError && (
                                    <p className="text-sm text-red-500">{passwordError}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>

                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>

                            <div className="flex items-center justify-center">

                                <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignUp}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="sr-only">Sign up with Google</span>
                                </Button>
                            </div>

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>

                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By signing up, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
