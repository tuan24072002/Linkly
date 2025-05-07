import { Link } from "react-router-dom";
import BadgeLanguage from "./BadgeLanguage";

type Props = {
    friend: userType
}
const FriendCard = ({ friend }: Props) => {
    return (
        <div className="card bg-base-200 hover:shadow-md transition-shadow">
            <div className="card-body p-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="avatar size-12">
                        <img src={friend?.profilePic} alt={friend?.fullName} />
                    </div>
                    <h3 className="font-semibold truncate">{friend?.fullName}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                    <BadgeLanguage user={friend} />
                </div>

                <Link
                    to={`/chat/${friend?._id}`}
                    className="btn btn-outline w-full"
                >
                    Message
                </Link>
            </div>
        </div>
    )
}
export default FriendCard;
