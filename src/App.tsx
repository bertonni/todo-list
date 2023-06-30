import { useEffect, useState } from "react";
import { AnimatePresence } from 'framer-motion';
import { Navbar } from "./components/Navbar";
import { TodosScreen } from "./screens/TodosScreen";
import { Plus } from "react-feather";
import { OptionsScreen } from "./screens/OptionsScreen";
import { AddTaskModal } from "./components/AddTaskModal";
import { useTodos } from "./contexts/TodosContext";
import { Toast } from "./components/Toast";

function App() {

  const { message, setMessage, currentColorScheme } = useTodos();

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

  useEffect(() => {
    if (currentColorScheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [currentColorScheme]);
  

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar active={activeItem} setActive={setActiveItem} />
      <AnimatePresence mode="wait">
        {showAddTaskModal ? <AddTaskModal close={() => setShowAddTaskModal(false)} /> : null}
      </AnimatePresence>
      <div className="px-6 sm:px-10 lg:px-14 flex flex-col gap-2 flex-1 overflow-auto">
        {activeItem === 1 ? <TodosScreen /> : <OptionsScreen />}
        <button
          className="fab"
          onClick={() => setShowAddTaskModal(true)}
        >
          <Plus size={24} />
          <span className="hidden md:flex">Criar Tarefa</span>
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
