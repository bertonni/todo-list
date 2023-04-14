import { useState } from "react";
import { Menu, List, Settings } from "react-feather";
import { Slidebar } from "./Slidebar";
import { AnimatePresence } from "framer-motion";
import { NavButton } from "./NavButton";

interface NavbarProps {
  active: number;
  setActive: (value: number) => void;
}

export const Navbar = ({ active, setActive }: NavbarProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="bg-white h-14 flex items-center px-2 border-b border-gray-100">
      <button
        className="rounded-full p-2 hover:bg-gray-200 sm:hidden
        text-gray-600 hover:text-gray-500"
        onClick={() => setShowSidebar(true)}
      >
        <Menu />
      </button>
      <AnimatePresence mode="wait">
        {showSidebar ? (
          <Slidebar
            active={active}
            setActive={setActive}
            close={() => setShowSidebar(false)}
          />
        ) : null}
      </AnimatePresence>
      <div className="sm:flex items-center hidden text-gray-600">
        <NavButton
          isActive={active === 1}
          title={"To-dos"}
          icon={<List size={20} />}
          action={() => setActive(1)}
        />
        <NavButton
          isActive={active === 2}
          title={"Options"}
          icon={<Settings size={20} />}
          action={() => setActive(2)}
        />
      </div>
    </div>
  );
};
