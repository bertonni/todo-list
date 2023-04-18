import { useState } from "react";
import { AnimatePresence } from 'framer-motion';
import { Navbar } from "./components/Navbar";
import { Todos } from "./screens/Todos";
import { Plus } from "react-feather";
import { Options } from "./screens/Options";
import { AddTaskModal } from "./components/AddTaskModal";

function App() {
  const [activeItem, setActiveItem] = useState<number>(1);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar active={activeItem} setActive={setActiveItem} />
      <AnimatePresence mode="wait">
        {showAddTaskModal ? <AddTaskModal close={() => setShowAddTaskModal(false)} /> : null}
      </AnimatePresence>
      <div className="px-6 sm:px-10 lg:px-14 flex flex-col gap-2 pb-20">
        {activeItem === 1 ? <Todos /> : <Options />}
        <button
          className="rounded-full flex items-center gap-2 text-lg
            bg-indigo-500 text-white py-2 pl-6 pr-4 w-max absolute
            right-6 bottom-10 shadow-md hover:brightness-105"
          onClick={() => setShowAddTaskModal(true)}
        >
          Criar Tarefa
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;
