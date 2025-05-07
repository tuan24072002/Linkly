import { ShipWheel } from "lucide-react";
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom";
import Assets from "../assets";
import { ErrorAlert } from "../components/ErrorAlert";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const { loginMutation, isPending, error } = useLogin();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        loginMutation(loginData);
    }
    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative" data-theme="forest">
            {
                error &&
                <ErrorAlert error={error} />
            }
            <div className="border border-primary/25 flex flex-col lg:flex-row-reverse w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
                <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
                    <div className="mb-4 flex items-center justify-start gap-2">
                        <ShipWheel className="size-9 text-primary" />
                        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                            Linkly
                        </span>
                    </div>
                    <div className="w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="">
                                    <h2 className="text-xl font-semibold">Welcome Back</h2>
                                    <p className="text-sm opacity-70">Sign in to your account to continue your language journey</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="form-control w-full">
                                        <label htmlFor="email" className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john.doe@me.com"
                                            className="input input-bordered w-full"
                                            value={loginData.email}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div className="form-control w-full">
                                        <label htmlFor="password" className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="**********"
                                            className="input input-bordered w-full"
                                            value={loginData.password}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <button
                                    disabled={isPending}
                                    type="submit"
                                    className="btn btn-primary w-full !mt-10">
                                    {isPending ?
                                        <><span className="loading loading-spinner loading-xs" />Signing in...</> : "Sign in"}
                                </button>
                                <div className="text-center mt-4">
                                    <p className="text-sm">
                                        Dont't have an account?{" "}
                                        <Link to="/signup" className="text-primary hover:underline">
                                            Create one
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
                    <div className="max-w-md p-8">
                        <div className="relative aspect-square max-w-sm mx-auto">
                            <img src={Assets.login} alt="Banner Signup" className="size-full" />
                        </div>

                        <div className="text-center space-y-3 mt-6">
                            <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
                            <p className="opacity-70">
                                Practice conversations, make friends, and improve your language skills together
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage