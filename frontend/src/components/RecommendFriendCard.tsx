import { CheckCircle, MapPinIcon, UserPlus } from "lucide-react";
import { cn } from "../lib/utils";
import useSendRequest from "../hooks/useSendRequest";
import BadgeLanguage from "./BadgeLanguage";
type Props = {
    user: userType;
    hasRequestBeenSent: boolean;
}
const RecommendFriendCard = ({ user, hasRequestBeenSent }: Props) => {
    const {
        sendRequestMutation,
        isPending
    } = useSendRequest();
    return (
        <div className="card bg-base-200 hover:shadow-md transition-all duration-300">
            <div className="card-body p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="avatar size-16 rounded-full">
                        <img src={user?.profilePic} alt={user?.fullName} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg truncate">{user?.fullName}</h3>
                        {
                            user?.location &&
                            <div className="flex items-center text-xs opacity-70 mt-1">
                                <MapPinIcon
                                    className="size-3 mr-1"
                                />
                                <span>{user?.location}</span>
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                    <BadgeLanguage user={user} />
                </div>

                {
                    user.bio &&
                    <p className="text-sm opacity-70">{user?.bio}</p>
                }

                <button
                    className={cn(
                        "btn w-full mt-2",
                        hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                    )}
                    onClick={() => sendRequestMutation({ userId: user._id })}
                    disabled={hasRequestBeenSent || isPending}
                >
                    {
                        hasRequestBeenSent ?
                            <>
                                <CheckCircle className="size-4 mr-2" />
                                Request Sent
                            </> :
                            <>
                                <UserPlus className="size-4 mr-2" />
                                Send Friend Request
                            </>
                    }
                </button>
            </div>
        </div>
    )
}
export default RecommendFriendCard