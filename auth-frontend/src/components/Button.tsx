import { motion } from "framer-motion";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    loading?: boolean;
    color?: "blue" | "red"; // add more colors if needed
}

const Button = ({ children, type = "button", onClick, loading = false, color = "blue" }: ButtonProps) => {
    // Determine gradient based on color
    const gradientClasses = color === "red"
        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`
                w-full py-2 rounded-lg
                ${gradientClasses}
                transition-all duration-300
                shadow-md hover:shadow-lg
                transform hover:scale-[1.02] active:scale-[0.98]
                text-white font-medium
                flex items-center justify-center
                relative
            `}
        >
            {loading && (
                <motion.div
                    className="absolute left-4 w-4 h-4 border-2 border-t-white border-l-white border-b-transparent border-r-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
            )}
            <span className={loading ? "opacity-50" : ""}>{children}</span>
        </button>
    );
}

export default Button;
