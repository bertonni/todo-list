import { useEffect, useState } from "react";
import { AnimatePresence } from 'framer-motion';
import { Navbar } from "./components/Navbar";
import { Todos } from "./screens/Todos";
import { Plus } from "react-feather";
import { Options } from "./screens/Options";
import { AddTaskModal } from "./components/AddTaskModal";
import { useTodos } from "./contexts/TodosContext";
import { Toast } from "./components/Toast";
import { Message } from "./@types/types";

function App() {

  const { message, setMessage } = useTodos();

  const [activeItem, setActiveItem] = useState<number>(1);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);

  useEffect(() => {
    if (message.text.length === 0) return;

    const showMessage = setTimeout(() => {
      setMessage({ variant: "primary", text: "" });
    }, 3500);
  
    return () => {
      clearTimeout(showMessage);
    }
  }, [message]);
  

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar active={activeItem} setActive={setActiveItem} />
      <AnimatePresence mode="wait">
        {showAddTaskModal ? <AddTaskModal close={() => setShowAddTaskModal(false)} /> : null}
      </AnimatePresence>
      <div className="px-6 sm:px-10 lg:px-14 flex flex-col gap-2 pb-16">
        {activeItem === 1 ? <Todos /> : <Options />}
        <button
          className="rounded-full flex items-center gap-2 text-lg z-30
            bg-indigo-500 text-white py-2 pl-6 pr-4 w-max absolute
            right-6 bottom-6 sm:bottom-10 shadow-lg hover:brightness-105
            shadow-indigo-300"
          onClick={() => setShowAddTaskModal(true)}
        >
          Criar Tarefa
          <Plus size={24} />
        </button>
      </div>
      <AnimatePresence mode="wait">
        {message.text.length > 0 ? (
          <Toast message={message.text} variant={message.variant} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
