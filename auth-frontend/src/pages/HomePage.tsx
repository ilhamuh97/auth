import React from "react";
import { formatDistanceToNow } from "date-fns";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FiCheckCircle, FiClock, FiMail, FiUser } from "react-icons/fi";
import Button from "../components/Button";

const HomePage: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
            <h2 className="text-4xl font-bold mb-6 text-center">Welcome, {user.name}!</h2>

            {/* Personal Info */}
            <div className="space-y-3 mb-6">
                <p className="flex items-center gap-2 text-lg">
                    <FiMail className="text-blue-400" />
                    Email: {user.email}{" "}
                    {user.isVerified && <FiCheckCircle className="ml-2 text-green-400" />}
                </p>
                <p className="flex items-center gap-2 text-lg">
                    <FiUser className="text-yellow-400" /> Account created:{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                </p>
            </div>

            {/* Separator */}
            <hr className="my-6 border-gray-700" />

            {/* User Activity */}
            <div className="space-y-3 mb-6">
                <p className="flex items-center gap-2 text-lg">
                    <FiClock className="text-purple-400" /> Last login:{" "}
                    {formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}
                </p>
            </div>

            <Button
                onClick={handleLogout}
                color="red"
            >
                Logout
            </Button>
        </div>
    );
};

export default HomePage;
