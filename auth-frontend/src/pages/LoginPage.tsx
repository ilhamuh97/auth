import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";

import PasswordField from "../components/PasswordField";
import InputField from "../components/InputField";
import Button from "../components/Button";

const LoginPage = () => {
    return (
        <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Login</h2>

            <form className="space-y-5">
                <InputField
                    label="Email Address"
                    type="email"
                    placeholder="email@example.com"
                    Icon={FiMail}
                />

                <PasswordField
                    label="Password"
                    placeholder="Enter password"
                />

                {/* Forgot Password Link */}
                <div>
                    <Link to="/forgot-password" className="text-blue-400 text-sm hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit">Login</Button>
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