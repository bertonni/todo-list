import { useState } from "react";
import { Menu, List, Moon, Sun } from "react-feather";
import { Slidebar } from "./Slidebar";
import { AnimatePresence } from "framer-motion";
import { NavButton } from "./NavButton";
import { useTodos } from "../contexts/TodosContext";

interface NavbarProps {
  active: number;
  setActive: (value: number) => void;
}
export const Navbar = ({ active, setActive }: NavbarProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const { currentColorScheme, changeColorScheme } = useTodos();

  return (
    <div className="h-14 flex items-center px-2 border-b border-gray-100 bg-white">
      <button
        aria-label="menu"
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
          title={"Tarefas"}
          icon={<List size={20} />}
          action={() => setActive(1)}
        />
        {/* <NavButton
          isActive={active === 2}
          title={"Opções"}
          icon={<Settings size={20} />}
          action={() => setActive(2)}
        /> */}
      </div>
      <button
        aria-label="change-color"
        className="rounded-full p-2 hover:bg-gray-100 
        text-gray-600 hover:text-gray-500 ml-auto
          transition-all hidden"
        onClick={() => changeColorScheme()}
      >
        {currentColorScheme === "light" ? <Moon /> : <Sun />}
      </button>
    </div>
  );
};
