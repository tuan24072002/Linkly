import { FormEvent, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { onboard } from "../lib/api";
import toast from "react-hot-toast";
import { CameraIcon, LoaderIcon, MapPin, ShipWheelIcon, Sparkles } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
    const { authUser } = useAuthUser();
    const queryClient = useQueryClient();
    const [formState, setFormState] = useState({
        fullName: authUser?.fullName || "",
        bio: authUser?.bio || "",
        nativeLanguage: authUser?.nativeLanguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        profilePic: authUser?.profilePic || "",
    });

    const { mutate: onboardMutation, isPending } = useMutation<
        AxiosResponse<any>,
        AxiosError<AxiosResponse<any>>,
        onboardType
    >({
        mutationFn: onboard,
        onSuccess: (data) => {
            toast.success(data.message || "Profile onboarded successfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error) => {
            toast.error(error.response?.data.message || "Something went wrong");
        }
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onboardMutation(formState);
    }
    const handleRandomAvatar = () => {
        const idx = Math.floor(Math.random() * 100) + 1;
        setFormState({
            ...formState,
            profilePic: `https://avatar.iran.liara.run/public/${idx}`
        })
        toast.dismiss();
        toast.success("Random profile picture generated");
    }
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
                <div className="card-body p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                                {
                                    formState.profilePic ?
                                        <img src={formState.profilePic} alt="Profile Picture" className="size-full object-cover" /> :
                                        <div className="flex items-center justify-center h-full">
                                            <CameraIcon className="size-12 text-base-content opacity-40" />
                                        </div>
                                }
                            </div>
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                                    <Sparkles className="size-4 mr-2" />
                                    Generate Random Avatar
                                </button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="fullName" className="label font-medium">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formState.fullName}
                                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                className="input input-bordered"
                                placeholder="Your full name"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="bio" className="label font-medium">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formState.bio}
                                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                                className="textarea textarea-bordered h-24 resize-none"
                                placeholder="Tell others about yourself and your language leaning goals"
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label htmlFor="nativeLanguage" className="label">
                                    <span className="label-text">Native Language</span>
                                </label>
                                <select
                                    name="nativeLanguage"
                                    id="nativeLanguage"
                                    value={formState.nativeLanguage}
                                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                                    className="select select-bordered w-full">
                                    <option value="">Select your native language</option>
                                    {
                                        LANGUAGES.map(lang => (
                                            <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-control">
                                <label htmlFor="learningLanguage" className="label">
                                    <span className="label-text">Learning Language</span>
                                </label>
                                <select
                                    name="learningLanguage"
                                    id="learningLanguage"
                                    value={formState.learningLanguage}
                                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                                    className="select select-bordered w-full">
                                    <option value="">Select your learning language</option>
                                    {
                                        LANGUAGES.map(lang => (
                                            <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="location" className="label font-medium">Location</label>
                            <div className="relative">
                                <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formState.location}
                                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="City, Country"
                                ></input>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                            {
                                isPending ?
                                    <>
                                        <LoaderIcon className="animate-spin size-5 mr-2" />
                                        <span>Onboarding...</span>
                                    </> :
                                    <>
                                        <ShipWheelIcon className="size-5 mr-2" />
                                        <span>Complete Onboarding</span>
                                    </>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OnboardingPage