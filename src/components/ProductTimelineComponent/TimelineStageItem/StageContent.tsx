import { memo } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { TimelineStage } from "@/utils";

const StageContent = memo(
  ({
    stage,
    isExpanded,
    formatDate,
    stageColor,
    isActive,
  }: {
    stage: TimelineStage;
    isExpanded: boolean;
    formatDate: (dateString: string) => string;
    stageColor: string;
    isActive: boolean;
  }) => (
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <motion.div
          animate={{
            backgroundColor: isActive
              ? [
                  stageColor.replace("1)", "0.15)"),
                  stageColor.replace("1)", "0.3)"),
                  stageColor.replace("1)", "0.15)"),
                ]
              : stageColor.replace("1)", "0.15)"),
          }}
          transition={{ duration: 1.5 }}
          className="px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ color: stageColor }}
        >
          {stage.stage}
        </motion.div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </motion.div>
      </div>

      <h3 className="text-lg font-semibold mt-1 text-gray-800 line-clamp-2">
        {stage.name}
      </h3>

      <div className="flex items-center mt-1 text-sm text-gray-500">
        <Calendar size={14} className="mr-1.5" />
        {formatDate(stage.date)}
      </div>
    </div>
  )
);

export default StageContent;