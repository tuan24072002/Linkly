import { Link } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { Bell, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
    const { authUser } = useAuthUser();
    const { logoutMutation } = useLogout();
    return (
        <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-[77px] flex items-center">
            <div className="container mx-auto ">
                <div className="flex items-center justify-end">
                    <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                        <Link to={"/notifications"} className="btn btn-ghost btn-circle">
                            <Bell className="size-6 text-base-content opacity-70" />
                        </Link>
                        <ThemeSelector />
                        <div className="avatar relative">
                            <div className="w-9 rounded-full">
                                <img
                                    src={authUser?.profilePic}
                                    alt="User Avatar"
                                    rel="noreferrer" />
                            </div>
                            <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full bg-success inline-block" />
                        </div>
                        <button className="btn btn-ghost btn-circle" onClick={() => logoutMutation()}>
                            <LogOutIcon className="size-6 text-base-content opacity-70" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar