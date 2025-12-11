import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import InputField from '../components/InputField'
import { FiMail } from 'react-icons/fi'

export default function ForgotPasswordPage() {
    const [email, setEmail] = React.useState("")
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const { isLoading, forgotPassword } = useAuthStore()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await forgotPassword(email)
            setIsSubmitted(true)
        } catch (error: unknown) {
            toast.error((error as Error).message || "Failed to send reset link. Please try again.")
            console.error("Forgot Password error:", error)
        }
    }

    return (
        <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Forgot Password</h2>

            {isSubmitted ? (
                <div className="text-center space-y-4">
                    <p className="text-green-400 text-lg">
                        ✅ A password reset link has been sent to <strong>{email}</strong>. Please check your inbox.
                    </p>
                    <Link
                        to="/login"
                        className="text-blue-400 hover:underline text-sm"
                    >
                        Back to Login
                    </Link>
                </div>
            ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <InputField
                        label="Email Address"
                        type="email"
                        placeholder="email@example.com"
                        Icon={FiMail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button type="submit" loading={isLoading}>
                        Send Reset Link
                    </Button>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="text-blue-400 text-sm hover:underline"
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
            )}
        </div>
    )
}
