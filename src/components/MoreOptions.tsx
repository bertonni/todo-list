import { AnimatePresence, motion, Variants } from "framer-motion";
import { CheckCircle, Edit2, Trash2, X } from "react-feather";

interface MoreOptionsProps {
  close: () => void;
}

const variants: Variants = {
  hidden: { right: 0, x: "100%", y: "-20%", transition: { duration: 0.2 } },
  visible: { right: 0, x: 0, y: 0, transition: { duration: 0.3 } },
};

const buttonVariant: Variants = {
  hidden: { opacity: 0, rotate: 90 },
  visible: { opacity: 1, rotate: 0, transition: { delay: 0.3 } },
};

export const MoreOptions = ({ close }: MoreOptionsProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit={"hidden"}
      className="rounded-r-lg h-full z-10 flex flex-col absolute top-0
        right-0 border w-1/5 bg-gray-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-full p-2 flex flex-col items-end">
        <button className="p-2 hover:bg-white rounded-full" onClick={close}>
          <X size={22} />
        </button>
        <button className="p-2 hover:bg-white rounded-full hover:text-sky-500
          transition-all">
          <Edit2 size={22} />
        </button>
        <button className="p-2 hover:bg-white rounded-full hover:text-red-500
          transition-all">
          <Trash2 size={22} />
        </button>
        <button className="p-2 hover:bg-white rounded-full hover:text-emerald-500
          transition-all">
          <CheckCircle size={22} />
        </button>
      </div>
    </motion.div>
  );
};
