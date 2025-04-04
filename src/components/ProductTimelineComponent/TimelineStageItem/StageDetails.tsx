// src/components/ProductTimelineComponent/TimelineStageItem/StageDetails.tsx
import { MapPin } from "lucide-react";
import { memo } from "react";
import { motion } from "framer-motion";
import { TimelineStage } from "@/utils";

const StageDetails = memo(
  ({
    stage,
    index,
    isLast,
    timelineLength,
  }: {
    stage: TimelineStage;
    index: number;
    isLast: boolean;
    timelineLength: number;
  }) => (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden bg-white rounded-b-lg border-t border-blue-100"
      id={`timeline-stage-${index}`}
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-4 bg-blue-50"
      >
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
        >
          <MapPin className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Location
            </h4>
            <p className="text-gray-700 mt-1">{stage.location}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex justify-end items-center"
        >
          {!isLast && (
            <div className="flex items-center text-xs text-gray-500">
              <span className="font-medium">Stage {index + 1}</span>
              <span className="mx-2">of</span>
              <span className="font-medium">{timelineLength}</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
);

StageDetails.displayName = "StageDetails";
export default StageDetails;
