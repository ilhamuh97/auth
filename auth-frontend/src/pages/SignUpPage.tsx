import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState(0);
    const checkPasswordStrength = (pwd: string) => {
        let score = 0;
        if (pwd.length >= 6) score++;
        if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        setStrength(score);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pwd = e.target.value;
        setPassword(pwd);
        checkPasswordStrength(pwd);
    };

    return (
        <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Create an Account</h2>
            <form className="space-y-5">
                <div>
                    <label className="block mb-1 text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 outline-none"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Email Address</label>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 outline-none"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter password"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 outline-none"
                    />
                    {/* Password Strength Bar */}
                    <div className="flex mt-2 space-x-1">
                        {[0, 1, 2, 3].map((level) => (
                            <div
                                key={level}
                                className={`h-2 flex-1 rounded ${level < strength ? "bg-blue-500" : "bg-gray-600"}`}
                            />
                        ))}
                    </div>

                    {/* Password Requirements */}
                    <ul className="mt-2 text-xs text-gray-300 space-y-1">
                        <li className={password.length >= 6 ? "text-green-400" : ""}>• Minimum 6 characters</li>
                        <li className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? "text-green-400" : ""}>• Includes uppercase and lowercase letters</li>
                        <li className={/\d/.test(password) ? "text-green-400" : ""}>• Includes a number</li>
                        <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-400" : ""}>• Includes a special character</li>
                    </ul>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    )
}
