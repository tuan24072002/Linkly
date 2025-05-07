import { ShipWheel } from "lucide-react";
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom";
import Assets from "../assets";
import toast from "react-hot-toast";
import { ErrorAlert } from "../components/ErrorAlert";
import useSignup from "../hooks/useSignup";

const SignupPage = () => {
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        agree: false
    })
    const { signupMutation, isPending, error } = useSignup();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!signupData.agree) return toast.error("Please agree to the terms and conditions.");
        signupMutation(signupData);
    }
    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative" data-theme="forest">
            {
                error &&
                <ErrorAlert error={error} />
            }
            <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
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
                                    <h2 className="text-xl font-semibold">Create an Account</h2>
                                    <p className="text-sm opacity-70">Join Linkly and start your language adventure!</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="form-control w-full">
                                        <label htmlFor="fullName" className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            placeholder="John Doe"
                                            className="input input-bordered w-full"
                                            value={signupData.fullName}
                                            onChange={handleChange}
                                            required />
                                    </div>
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
                                            value={signupData.email}
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
                                            value={signupData.password}
                                            onChange={handleChange}
                                            required />
                                        <p className="text-xs opacity-70 mt-1">
                                            Password must be at least 6 characters
                                        </p>
                                    </div>

                                    <div className="form-control w-fit">
                                        <label htmlFor="agree" className="label cursor-pointer justify-start gap-2">
                                            <input
                                                id="agree"
                                                name="agree"
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                checked={signupData.agree}
                                                onChange={(e) => setSignupData({ ...signupData, agree: e.target.checked })} />
                                            <span className="text-xs leading-tight">
                                                I agree to the {" "}
                                                <button type="button" onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert("Terms of Service")
                                                }} className="text-primary hover:underline">Terms of Service</button> and {" "}
                                                <button type="button" onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert("Privacy Policy")
                                                }} className="text-primary hover:underline">Privacy Policy</button>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    disabled={isPending}
                                    type="submit"
                                    className="btn btn-primary w-full">
                                    {isPending ?
                                        <><span className="loading loading-spinner loading-xs" />Loading</> : "Create Account"}
                                </button>
                                <div className="text-center mt-4">
                                    <p className="text-sm">
                                        Already have an account? {" "}
                                        <Link to="/login" className="text-primary hover:underline">
                                            Login
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
                            <img src={Assets.signup} alt="Banner Signup" className="size-full" />
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

export default SignupPage