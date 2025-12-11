import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { toast } from "react-toastify";

import PasswordField from "../components/PasswordField";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Login successful!");
        } catch (error) {
            toast.error((error as Error).message || "Login failed. Please try again.");
            console.log("Login error:", error);
        }
    };

    return (
        <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Login</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <InputField
                    label="Email Address"
                    type="email"
                    placeholder="email@example.com"
                    Icon={FiMail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordField
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div>
                    <Link to="/forgot-password" className="text-blue-400 text-sm hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" loading={isLoading}>Login</Button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-300">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-400 hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;