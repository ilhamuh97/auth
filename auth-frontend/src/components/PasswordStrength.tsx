interface PasswordStrengthProps {
    password: string;
}

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
    // Calculate strength score
    const strength = (() => {
        let score = 0;
        if (password.length >= 6) score++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    })();

    return (
        <div className="mt-2">
            {/* Strength Bar */}
            <div className="flex space-x-1 mb-2">
                {[0, 1, 2, 3].map((level) => (
                    <div
                        key={level}
                        className={`h-2 flex-1 rounded ${level < strength ? "bg-blue-500" : "bg-gray-600"}`}
                    />
                ))}
            </div>

            {/* Requirements */}
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