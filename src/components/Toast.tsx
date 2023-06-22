import { motion, Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.7 } },
  visible: { opacity: 1, transition: { duration: 0.7 }  },
};

interface ToastProps {
  variant: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "neutral";
  message: string;
}

export const Toast = ({ variant = "primary", message }: ToastProps) => {
  const bgColor =
    variant === "primary"
      ? "bg-indigo-100 text-indigo-500"
      : variant === "secondary"
      ? "bg-teal-100 text-teal-500"
      : variant === "success"
      ? "bg-emerald-100 text-emerald-500"
      : variant === "warning"
      ? "bg-amber-100 text-amber-500"
      : variant === "error"
      ? "bg-red-100 text-red-500"
      : variant === "neutral"
      ? "bg-gray-100 text-gray-500"
      : "bg-sky-100 text-sky-500";

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`${bgColor} rounded px-6 py-2 flex items-center justify-center
        absolute left-0 right-0 mx-auto top-[2%] z-20 w-max min-w-[280px]
        min-h-[60px]`}
    >
      <p className="font-medium text-sm sm:text-base">{message}</p>
    </motion.div>
  );
};
