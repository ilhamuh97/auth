import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Login</h2>
            <form className="space-y-5">
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
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                        >
                            {passwordVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Login
                </button>
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
