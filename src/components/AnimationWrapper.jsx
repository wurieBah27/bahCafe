import { motion, AnimatePresence } from "framer-motion";
const AnimationWrapper = ({
  children,
  animate = { opacity: 1, x: 0 },
  initial = { opacity: 0, x: 50 },
  transition = { dutaion: 2 },
}) => {
  return (
    <AnimatePresence>
      <motion.div initial={initial} animate={animate} transition={transition}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
