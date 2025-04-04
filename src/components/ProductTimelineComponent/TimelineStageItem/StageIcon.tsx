import { memo, ReactNode } from "react";
import { motion } from "framer-motion";
const StageIcon = memo(
  ({
    stage,
    isActive,
    getStageIcon,
    getStageColor,
  }: {
    stage: string;
    isActive: boolean;
    getStageIcon: (stage: string) => ReactNode;
    getStageColor: (stage: string, opacity?: number) => string;
  }) => (
    <div className="relative flex-shrink-0">
      <motion.div
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
          boxShadow: isActive ? "0 0 0 4px rgba(46, 106, 207, 0.15)" : "none",
        }}
        transition={{
          scale: {
            duration: 0.6,
            repeat: isActive ? Infinity : 0,
            repeatDelay: 2,
          },
          boxShadow: { duration: 0.3 },
        }}
        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md"
        style={{ backgroundColor: getStageColor(stage) }}
      >
        {getStageIcon(stage)}
      </motion.div>
    </div>
  )
);

export default StageIcon;
