import { X, List, Settings } from "react-feather";
import { motion, Variants } from "framer-motion";
import { NavButton } from "./NavButton";

interface SlidebarProps {
  close: () => void;
  active: number;
  setActive: (value: number) => void;
}

const variants: Variants = {
  hidden: { x: "-100%", transition: { duration: 0.2 } },
  visible: { x: 0, transition: { duration: 0.3 } },
};

export const Slidebar = ({ close, active, setActive }: SlidebarProps) => {

  const handleClick = (value: number) => {
    setActive(value);
    close();
  };

  return (
    <div className="bg-black/40 inset-0 fixed h-screen w-full z-10 sm:hidden">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-white max-w-[360px] w-full z-20 flex flex-col text-gray-600
        absolute left-0 top-0 h-full p-2"
      >
        <button
          className="rounded-full p-2 hover:bg-gray-50 w-max self-end"
          onClick={close}
        >
          <X className="text-gray-500" size={28} />
        </button>
        <NavButton
          isActive={active === 1}
          title={"To-dos"}
          icon={<List size={20} />}
          action={() => handleClick(1)}
        />
        <NavButton
          isActive={active === 2}
          title={"Options"}
          icon={<Settings size={20} />}
          action={() => handleClick(2)}
        />
      </motion.div>
    </div>
  );
};
