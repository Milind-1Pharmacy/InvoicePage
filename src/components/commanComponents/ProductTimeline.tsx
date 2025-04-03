import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import {
  Building2,
  Truck,
  Store,
  UserCircle,
  Package,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowRightLeft,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface TimelineStage {
  stage: string;
  name: string;
  location: string;
  date: string;
  status: "completed" | "in-progress" | "pending" | string;
}

const MobileProductTimeline: React.FC<{ timeline: TimelineStage[] }> = ({
  timeline,
}) => {
  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>(
    {}
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Auto-animate through stages on mobile
  useEffect(() => {
    if (timeline.length === 0) return;

    // Initial animation when component loads
    const initialDelay = setTimeout(() => {
      // Pulse each stage briefly in sequence
      let currentIndex = 0;

      const interval = setInterval(() => {
        setActiveIndex(currentIndex);

        setTimeout(() => {
          setActiveIndex(null);
        }, 800);

        currentIndex++;
        if (currentIndex >= timeline.length) {
          clearInterval(interval);
        }
      }, 1000);
    }, 500);

    return () => clearTimeout(initialDelay);
  }, [timeline.length]);

  const toggleStage = (index: number) => {
    setExpandedStages((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the clicked stage only
    }));

    // Set active index for animation
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 800);
  };

  const getStageIcon = (stage: string) => {
    const stageLower = stage.toLowerCase();
    switch (stageLower) {
      case "manufacturer":
        return <Building2 size={20} />;
      case "supplier":
        return <Truck size={20} />;
      case "retailer":
        return <Store size={20} />;
      case "consumer":
        return <UserCircle size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "completed":
        return <CheckCircle size={18} className="text-emerald-500" />;
      case "in-progress":
        return <Clock size={18} className="text-amber-500" />;
      case "pending":
        return <AlertCircle size={18} className="text-gray-400" />;
      default:
        return <AlertCircle size={18} className="text-gray-400" />;
    }
  };

  const getStageColor = (stage: string, opacity: number = 1) => {
    const stageLower = stage.toLowerCase();
    const colors = {
      manufacturer: `rgba(46, 106, 207, ${opacity})`, // Your primary color
      supplier: `rgba(124, 58, 237, ${opacity})`, // Purple
      retailer: `rgba(236, 72, 153, ${opacity})`, // Pink
      consumer: `rgba(16, 185, 129, ${opacity})`, // Green
      default: `rgba(107, 114, 128, ${opacity})`, // Gray
    };
    return colors[stageLower as keyof typeof colors] || colors.default;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#2e6acf] to-[#1d4f9a] p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Product Journey
          </h2>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          >
            <ArrowRightLeft className="text-white/80" size={20} />
          </motion.div>
        </div>
        <p className="text-blue-100 text-sm mt-1">
          Track your product's complete lifecycle
        </p>
      </div>

      <div className="p-3">
        {timeline.map((stage, index) => (
          <div key={index} className="relative">
            {/* Connecting line */}
            {index < timeline.length - 1 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="absolute left-10 top-14 bottom-0 w-px bg-gray-200 z-0"
              />
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative z-10 mb-6 rounded-lg transition-all duration-300 active:bg-gray-50`}
            >
              <motion.div
                whileTap={{ scale: 0.98 }}
                className={`flex gap-4 p-4 cursor-pointer transition-colors duration-300 rounded-tl-lg rounded-tr-lg ${
                  expandedStages[index] ? "bg-blue-50" : ""
                }`}
                onClick={() => toggleStage(index)}
              >
                {/* Stage Icon */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    animate={{
                      scale:
                        activeIndex === index || expandedStages[index]
                          ? [1, 1.1, 1]
                          : 1,
                      boxShadow: expandedStages[index]
                        ? "0 0 0 4px rgba(46, 106, 207, 0.15)"
                        : "0 0 0 0px rgba(46, 106, 207, 0)",
                    }}
                    transition={{
                      scale: {
                        duration: 0.6,
                        repeat: expandedStages[index] ? Infinity : 0,
                        repeatDelay: 2,
                      },
                      boxShadow: { duration: 0.3 },
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: getStageColor(stage.stage) }}
                  >
                    {getStageIcon(stage.stage)}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <motion.div
                      animate={{
                        backgroundColor:
                          activeIndex === index
                            ? [
                                getStageColor(stage.stage, 0.15),
                                getStageColor(stage.stage, 0.3),
                                getStageColor(stage.stage, 0.15),
                              ]
                            : getStageColor(stage.stage, 0.15),
                      }}
                      transition={{ duration: 1.5 }}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        color: getStageColor(stage.stage),
                      }}
                    >
                      {stage.stage}
                    </motion.div>

                    <motion.div
                      animate={{ rotate: expandedStages[index] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400"
                    >
                      {expandedStages[index] ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
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
              </motion.div>

              {/* Expanded details */}
              <AnimatePresence>
                {expandedStages[index] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-white rounded-b-lg border-t border-blue-100"
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
                        <MapPin
                          className="text-gray-400 flex-shrink-0 mt-0.5"
                          size={18}
                        />
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
                        className="mt-4 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(stage.status)}
                          <span className="capitalize text-sm font-medium text-gray-700">
                            {stage.status.replace(/-/g, " ")}
                          </span>
                        </div>

                        {/* Timeline progress indicator */}
                        {index < timeline.length - 1 && (
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="font-medium">
                              Stage {index + 1}
                            </span>
                            <span className="mx-2">of</span>
                            <span className="font-medium">
                              {timeline.length}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileProductTimeline;
