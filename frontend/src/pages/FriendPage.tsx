import { UsersIcon } from "lucide-react";
import FriendCard from "../components/FriendCard";
import Loading from "../components/Loading";
import NoFriendsFound from "../components/NoFriendsFound";
import useFriend from "../hooks/useFriend";
import { Link } from "react-router-dom";

const FriendPage = () => {
    const { friends, loadingFriends } = useFriend();

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto space-y-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
                    <Link
                        to={"/notifications"}
                        className="btn btn-outline btn-sm"
                    >
                        <UsersIcon className="mr-2 size-4" />
                        <span>Friend Requests</span>
                    </Link>
                </div>

                {
                    loadingFriends ?
                        <Loading /> :
                        friends.data.length === 0 ?
                            <NoFriendsFound /> :
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {
                                    Array.isArray(friends.data) && friends.data?.map((friend: userType) =>
                                        <FriendCard key={friend._id} friend={friend} />
                                    )
                                }
                            </div>
                }
            </div>
        </div>
    )
}
export default FriendPage