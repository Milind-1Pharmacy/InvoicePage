import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Truck,
  Store,
  UserCircle,
  Package,
  ArrowRightLeft,
} from "lucide-react";
import { ProductInfoCard } from "../HouseOfCards";
import { Product } from "@/utils";
import { StageContent, StageDetails, StageIcon } from "./TimelineStageItem";
import { Separator } from "../ui/separator";

const STAGE_ICONS: Record<string, ReactNode> = {
  manufacturer: <Building2 size={20} />,
  supplier: <Truck size={20} />,
  retailer: <Store size={20} />,
  consumer: <UserCircle size={20} />,
  default: <Package size={20} />,
};

const STAGE_COLORS: Record<string, string> = {
  manufacturer: "rgba(46, 106, 207, $opacity)",
  supplier: "rgba(124, 58, 237, $opacity)",
  retailer: "rgba(236, 72, 153, $opacity)",
  consumer: "rgba(16, 185, 129, $opacity)",
  default: "rgba(107, 114, 128, $opacity)",
};

const MobileProductTimeline = ({ product }: { product: Product }) => {
  const { timeline, productData } = product;
  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>(
    {}
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const normalizedTimeline = useMemo(() => {
    return timeline.map((stage) => ({
      ...stage,
      status: stage.status.toLowerCase(),
    }));
  }, [timeline]);

  useEffect(() => {
    if (!normalizedTimeline.length) return;

    const animationDelay = 500;
    const stageDuration = 1000;
    const highlightDuration = 800;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const startAnimation = () => {
      let currentIndex = 0;

      intervalId = setInterval(() => {
        setActiveIndex(currentIndex);

        timeoutId = setTimeout(() => {
          setActiveIndex(null);
          currentIndex++;

          if (currentIndex >= normalizedTimeline.length) {
            clearInterval(intervalId);
          }
        }, highlightDuration);
      }, stageDuration);
    };

    timeoutId = setTimeout(startAnimation, animationDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [normalizedTimeline.length]);

  const toggleStage = useCallback((index: number) => {
    setExpandedStages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 800);
  }, []);

  const getStageIcon = useCallback((stage: string) => {
    return STAGE_ICONS[stage.toLowerCase()] || STAGE_ICONS.default;
  }, []);

  const getStageColor = useCallback((stage: string, opacity: number = 1) => {
    const color = STAGE_COLORS[stage.toLowerCase()] || STAGE_COLORS.default;
    return color.replace("$opacity", opacity.toString());
  }, []);

  const formatDate = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  }, []);

  if (!normalizedTimeline.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 text-center">
        <p>No timeline data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <ProductInfoCard
        product={{
          imgUrl: productData.imgUrl,
          name: productData.name,
          description: productData.description || "",
          packs: productData.packs,
          mrp: productData.mrp,
        }}
      />

      <Separator className="  bg-gray-300" />

      <div className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        {/* Subtle overlay pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Content */}
        <div className="relative flex items-center justify-between p-4 border-t border-b border-blue-100/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-medium text-blue-800">
                Product Journey
              </h2>
              <p className="text-blue-600 text-xs">
                Track your product's complete lifecycle
              </p>
            </div>
          </div>

          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              delay: 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 5,
            }}
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm"
          >
            <ArrowRightLeft className="text-blue-700" size={18} />
          </motion.div>
        </div>
      </div>

      <div className="p-3">
        {normalizedTimeline.map((stage, index) => (
          <div key={`${stage.name}-${index}`} className="relative">
            {index !== normalizedTimeline.length - 1 && (
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
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative z-10 mb-6 rounded-lg transition-all duration-300 active:bg-gray-50"
            >
              <motion.div
                whileTap={{ scale: 0.98 }}
                className={`flex gap-4 p-4 cursor-pointer transition-colors duration-300 rounded-tl-lg rounded-tr-lg ${
                  expandedStages[index] ? "bg-blue-50" : ""
                }`}
                onClick={() => toggleStage(index)}
                role="button"
                aria-expanded={!!expandedStages[index]}
                aria-controls={`timeline-stage-${index}`}
                tabIndex={0}
              >
                <StageIcon
                  stage={stage.stage}
                  isActive={activeIndex === index || !!expandedStages[index]}
                  getStageIcon={getStageIcon}
                  getStageColor={getStageColor}
                />

                <StageContent
                  stage={stage}
                  isExpanded={!!expandedStages[index]}
                  formatDate={formatDate}
                  stageColor={getStageColor(stage.stage)}
                  isActive={activeIndex === index}
                />
              </motion.div>

              <AnimatePresence>
                {expandedStages[index] && (
                  <StageDetails
                    stage={stage}
                    index={index}
                    isLast={index === normalizedTimeline.length - 1}
                    timelineLength={normalizedTimeline.length}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MobileProductTimeline);
