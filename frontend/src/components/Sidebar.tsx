import { Link, NavLink } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser"
import { Bell, Home, ShipWheelIcon, User } from "lucide-react";
import { cn } from "../lib/utils";

const Sidebar = () => {
    const { authUser } = useAuthUser();
    return (
        <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
            <div className="p-5 border-b border-base-300">
                <Link to={"/"} className="flex items-center gap-2.5">
                    <ShipWheelIcon className="size-9 text-primary" />
                    <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">Linkly</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <NavLink to={"/"} className={({ isActive }) => cn("btn btn-ghost justify-start w-full gap-3 px-3 normal-case", isActive && "btn-active")}>
                    <Home className="size-5 text-base-content opacity-70" />
                    <span>Home</span>
                </NavLink>
                <NavLink to={"/friends"} className={({ isActive }) => cn("btn btn-ghost justify-start w-full gap-3 px-3 normal-case", isActive && "btn-active")}>
                    <User className="size-5 text-base-content opacity-70" />
                    <span>Friends</span>
                </NavLink>
                <NavLink to={"/notifications"} className={({ isActive }) => cn("btn btn-ghost justify-start w-full gap-3 px-3 normal-case", isActive && "btn-active")}>
                    <Bell className="size-5 text-base-content opacity-70" />
                    <span>Notifications</span>
                </NavLink>
            </nav>

            <div className="p-4 border-t border-base-300">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={authUser?.profilePic} alt="User Avatar" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-sm">{authUser?.fullName}</p>
                        <p className="text-xs text-success flex items-center gap-1">
                            <span className="size-2 rounded-full bg-success inline-block" />
                            Online
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default Sidebar