import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuthStore } from '../store/authStore'
import Button from '../components/Button'
import PasswordField from '../components/PasswordField'

export default function ResetPassword() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get("token")
    const email = queryParams.get("email")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    const { resetPassword, isLoading } = useAuthStore()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.")
            return
        }

        try {
            await resetPassword(token as string, email as string, password)
            toast.success("Password has been reset successfully! You can now log in with your new password.")
            navigate("/login")
        } catch (error: unknown) {
            toast.error((error as Error).message || "Password reset failed. Please try again.")
            console.log("Reset Password error:", error)
        }
    }

    return (
        <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Reset Password</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <PasswordField
                    label="New Password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <PasswordField
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button type="submit" loading={isLoading}>
                    Reset Password
                </Button>

                <div className="text-center">
                    <Link to="/login" className="text-blue-400 text-sm hover:underline">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}
