import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail } from "react-icons/fi";
import { toast } from 'react-toastify';

import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import PasswordStrength from "../components/PasswordStrength";
import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading } = useAuthStore();
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate required fields
        if (!fullName || !email || !password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (passwordStrength < 4) {
            toast.error("Please use a stronger password.");
            return;
        }

        try {
            await signup(fullName, email, password);
            navigate("/verify-email");
            toast.success("Signup successful! Please verify your email.");
        } catch (error: unknown) {
            toast.error((error as Error).message || "Signup failed. Please try again.");
            console.log("Signup error:", error);
        }

    };

    return (
        <>
            <div className="z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
                <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Create an Account</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <InputField
                        label="Name"
                        placeholder="John Doe"
                        type="text"
                        Icon={FiUser}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <InputField
                        label="Email Address"
                        placeholder="email@example.com"
                        type="email"
                        Icon={FiMail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordField
                        label="Password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <PasswordStrength
                        password={password}
                        onStrengthChange={setPasswordStrength}
                    />

                    <Button type="submit" loading={isLoading}>Sign Up</Button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-300">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </>
    );
}

export default SignUpPage;