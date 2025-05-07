import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { getOutgoingRequests, getRecommendedUsers } from "../lib/api";
import NoRecommendFriendsFound from "../components/NoRecommendFriendsFound";
import RecommendFriendCard from "../components/RecommendFriendCard";

const HomePage = () => {
    const [outgoingRequestsIds, setOutgoingRequestsIds] = useState<Set<unknown>>(new Set());
    const { data: recommendedUsers, isLoading: loadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: getRecommendedUsers,
    });
    const { data: outgoingFriendReqs } = useQuery({
        queryKey: ["outgoingFriendReqs"],
        queryFn: getOutgoingRequests,
    });

    useEffect(() => {
        const outgoingIds = new Set();
        if (outgoingFriendReqs && outgoingFriendReqs.data.length > 0) {
            outgoingFriendReqs.data.forEach((req: friendRequestType) => {
                outgoingIds.add(req.recipient._id);
            });
            setOutgoingRequestsIds(outgoingIds);
        }
    }, [outgoingFriendReqs])

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto space-y-10">
                <section>
                    <div className="mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="">
                                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
                                <p className="opacity-70">
                                    Discover perfect language exchange partners based on your profile
                                </p>
                            </div>
                        </div>
                    </div>

                    {
                        loadingUsers ?
                            <div className="flex justify-center py-2">
                                <span className="loading loading-spinner loading-lg" />
                            </div> :
                            recommendedUsers.data.length === 0 ?
                                <NoRecommendFriendsFound /> :
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {
                                        Array.isArray(recommendedUsers.data) && recommendedUsers.data?.map((user: userType) => {
                                            const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                                            return (
                                                <RecommendFriendCard
                                                    key={user._id}
                                                    user={user}
                                                    hasRequestBeenSent={hasRequestBeenSent} />
                                            )
                                        }
                                        )
                                    }
                                </div>
                    }
                </section>
            </div>
        </div>
    )
}

export default HomePage