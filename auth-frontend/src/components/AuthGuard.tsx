import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

const AuthGuard = ({
    children,
    requireAuth = false,
    requireVerified = false,
}: {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireVerified?: boolean;
}) => {
    const { isAuthenticated, user } = useAuthStore();

    // Not authenticated but route requires it
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Authenticated user trying to access guest-only route
    if (!requireAuth && isAuthenticated && user?.isVerified) {
        return <Navigate to="/" replace />;
    }

    // Authenticated but not verified when verification is required
    if (requireVerified && !user?.isVerified) {
        return <Navigate to="/verify-email" replace />;
    }

    return children;
};

export default AuthGuard;