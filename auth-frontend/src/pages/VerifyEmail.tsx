import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";

const VerifyEmail = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const { verifyEmail, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleChange = (value: string, index: number) => {
        // Only allow digits
        if (/^[0-9]?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Move focus to next input if value is entered
            if (value && index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const newCode = [...code];
        for (let i = 0; i < pasteData.length; i++) {
            newCode[i] = pasteData[i];
        }
        setCode(newCode);

        const lastIndex = pasteData.length - 1;
        if (lastIndex >= 0 && lastIndex < inputsRef.current.length) {
            inputsRef.current[lastIndex]?.focus();
        }
    };

    const handleConfirm = async () => {
        const verificationCode = code.join("");

        try {
            await verifyEmail(verificationCode);
            toast.success("Email verified successfully!");
            navigate("/");
        } catch (error: unknown) {
            const errorMessage = (error as Error)?.message || "Email verification failed";
            toast.error(errorMessage);
        }
    }

    return (
        <div className="z-10 w-full max-w-md p-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg text-white mx-4">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Verify Email</h2>
            <p className="text-center text-gray-300 mb-6">
                Enter the 6-digit code sent to your email
            </p>

            <div className="flex justify-between mb-6">
                {code.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputsRef.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="w-12 h-12 text-center text-lg rounded border bg-gray-700/50 border-gray-600 focus:outline-none focus:border-blue-400 focus:shadow-md focus:shadow-blue-500/20 transition-all duration-300"
                    />
                ))}
            </div>

            <Button type="button" onClick={handleConfirm} loading={isLoading}>
                Verify Email
            </Button>
        </div>
    );
}

export default VerifyEmail;