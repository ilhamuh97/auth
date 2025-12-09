import { useState } from "react";
import type { IconType } from "react-icons";

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    Icon: IconType;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type = "text", placeholder, Icon, value, onChange }: InputFieldProps) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="w-full">
            <label className="block mb-1 text-sm font-medium text-gray-300">{label}</label>

            <div
                className={`relative flex items-center rounded-lg border bg-gray-700/50 px-4 transition-all duration-300
                ${focused ? "border-blue-400 shadow-md shadow-blue-500/20" : "border-gray-600"}`}
            >
                <Icon
                    className={`mr-3 text-lg transition-colors duration-300
                    ${focused ? "text-blue-400" : "text-gray-400"}`}
                />

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full py-2 bg-transparent outline-none text-white placeholder-gray-400"
                />
            </div>
        </div>
    );
}

export default InputField;