import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiMail } from "react-icons/fi";

import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import PasswordStrength from "../components/PasswordStrength";
import Button from "../components/Button";

const SignUpPage = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate required fields
        if (!fullName || !email || !password) {
            setNotification({ message: "All fields are required.", type: "error" });
            setTimeout(() => setNotification(null), 5000);
            return;
        }

        setLoading(true);

        const payload = { fullName, email, password };

        try {
            const response = await fetch("https://your-backend-api.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({ message: "Account created successfully!", type: "success" });
                setFullName("");
                setEmail("");
                setPassword("");
            } else {
                setNotification({ message: data.message || "Signup failed. Please try again.", type: "error" });
            }
        } catch (error) {
            setNotification({ message: "Signup failed. Please try again.", type: "error" });
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }

        // Auto-hide notification
        setTimeout(() => setNotification(null), 5000);
    };

    return (
        <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Create an Account</h2>

            {/* Simple Notification */}
            {notification && (
                <div
                    className={`mb-4 px-4 py-2 rounded ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
                        } text-white text-center`}
                >
                    {notification.message}
                </div>
            )}

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

                <PasswordStrength password={password} />

                <Button type="submit" loading={loading}>Sign Up</Button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignUpPage;