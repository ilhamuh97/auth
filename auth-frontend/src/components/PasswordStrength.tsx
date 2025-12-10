import { useEffect } from "react";

interface PasswordStrengthProps {
    password: string;
    onStrengthChange?: (strength: number) => void; // ⬅️ added
}

const PasswordStrength = ({ password, onStrengthChange }: PasswordStrengthProps) => {

    const strength = (() => {
        let score = 0;
        if (password.length >= 6) score++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    })();

    // Report strength to parent component
    useEffect(() => {
        onStrengthChange?.(strength);
    }, [strength, onStrengthChange]);

    return (
        <div className="mt-2">
            <div className="flex space-x-1 mb-2">
                {[0, 1, 2, 3].map((level) => (
                    <div
                        key={level}
                        className={`h-2 flex-1 rounded ${level < strength ? "bg-blue-500" : "bg-gray-600"}`}
                    />
                ))}
            </div>

            <ul className="text-xs text-gray-300 space-y-1">
                <li className={password.length >= 6 ? "text-green-400" : ""}>
                    • Minimum 6 characters
                </li>
                <li className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? "text-green-400" : ""}>
                    • Includes uppercase and lowercase letters
                </li>
                <li className={/\d/.test(password) ? "text-green-400" : ""}>
                    • Includes a number
                </li>
                <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-400" : ""}>
                    • Includes a special character
                </li>
            </ul>
        </div>
    );
}

export default PasswordStrength;
