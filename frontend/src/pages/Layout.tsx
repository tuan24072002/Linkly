import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import useAuthUser from "../hooks/useAuthUser";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

type Props = {
    children: ReactNode;
    showSidebar?: boolean;
    showNavbar?: boolean;
}
const Layout = ({ children, showSidebar = false, showNavbar = true }: Props) => {
    const location = useLocation();
    const { isLoading, authUser } = useAuthUser();

    const isAuthenticated = Boolean(authUser);
    const isOnboarded = authUser?.isOnboarded

    const authPaths = ["/login", "/signup"];
    const isAuthPage = authPaths.includes(location.pathname);

    if (isLoading) {
        return <PageLoader />;
    }
    if (!isAuthenticated && !isAuthPage) {
        return <Navigate to="/login" replace />;
    }
    if (isAuthenticated && !isOnboarded && location.pathname !== "/onboarding") {
        return <Navigate to="/onboarding" replace />;
    }
    if (isAuthenticated && isOnboarded && location.pathname === "/onboarding") {
        return <Navigate to="/" replace />;
    }
    if (isAuthenticated && isOnboarded && isAuthPage) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen">
            <div className="flex">
                {showSidebar && <Sidebar />}
                <div className="flex-1 flex flex-col">
                    {!isAuthPage && showNavbar && <Navbar />}
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
export default Layout