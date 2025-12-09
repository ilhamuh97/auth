import { motion } from 'framer-motion'

const FloatingOrb = ({ color, size, top, left, delay }: { color: string; size: string; top: string; left: string; delay: number }) => {
    return (
        <motion.div
            className={`absolute rounded-full opacity-20 filter blur-2xl ${color} ${size} ${top} ${left}`}
            style={{ top, left }}
            animate={{
                y: ["0%", "100%", "0%"],
                x: ["0%", "100%", "0%"],
                rotate: [0, 360],
            }}
            transition={{
                delay: delay,
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            }}
            aria-hidden="true"
        />
    )
}

export default FloatingOrb;