import { motion } from "framer-motion";

const AuthLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white">
            <motion.div
                className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mb-6"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <motion.div
                    className="relative w-12 h-12"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                >
                    {[0, 1, 2, 3].map((i) => (
                        <motion.span
                            key={i}
                            className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-md"
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: `rotate(${i * 90}deg) translate(20px)`,
                            }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.2,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            <motion.p
                className="text-lg text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
                Checking authentication...
            </motion.p>
        </div>
    );
};

export default AuthLoader;
