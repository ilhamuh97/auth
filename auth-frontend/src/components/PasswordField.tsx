import { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

interface Props {
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const PasswordField = ({ label, value, onChange, placeholder }: Props) => {
    const [visible, setVisible] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">{label}</label>

            <div
                className={`relative flex items-center rounded-lg border px-4 bg-gray-700/50 transition-all duration-300 
                ${focused ? "border-blue-400 shadow-md shadow-blue-500/20" : "border-gray-600"}
            `}
            >
                <FiLock
                    className={`mr-3 text-lg transition-colors duration-300 ${focused ? "text-blue-400" : "text-gray-400"
                        }`}
                />

                <input
                    type={visible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full py-2 bg-transparent outline-none text-white placeholder-gray-400"
                />

                <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-3 text-gray-300 hover:text-white text-lg"
                >
                    {visible ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
        </div>
    );
}

export default PasswordField;