import { motion } from "framer-motion"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

// I want a fade in bottom-up - fade out top-down animation
// so these are my variants
const variants = {
  hidden: { opacity: 0,  y: "100%" },
  enter: { opacity: 1,  y: "0%" },
  exit: { opacity: 0, y: "100%" },
}

const AnimatedLayout = ({ children }: Props): React.JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.75, type: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedLayout
