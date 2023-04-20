import { useEffect, useState } from "react";
import { TabNavigation } from "../components/TabNavigation";
import { TodoCard } from "../components/TodoCard";
import { useTodos } from "../contexts/TodosContext";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Toast } from "../components/Toast";
import { Message } from "../@types/types";
import { ConfirmBox } from "../components/ConfirmBox";

const statuses: string[] = ["To do", "Done", "Canceled"];

const container: Variants = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const messageVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const Todos = () => {
  const { todos } = useTodos();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [todoMessage, setTodoMessage] = useState<string>("Não há tarefas cadastradas");
  const [showConfirmBox, setShowConfirmBox] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    const data = todos.filter(
      (todo) => todo.status === statuses[currentTab - 1]
    );

    if (data.length === 0) {
      switch (currentTab) {
        case 1:
          setTodoMessage("Não há tarefas cadastradas");
          break;
        case 2:
          setTodoMessage("Não há tarefas realizadas");
          break;
        case 3:
          setTodoMessage("Não há tarefas canceladas");
          break;
      }
    } else {
      setTodoMessage("");
    }
  }, [currentTab]);

  return (
    <div className="rounded text-gray-700">
      <h1 className="font-medium text-2xl my-4">Lista de Tarefas</h1>
      <AnimatePresence>
        {showConfirmBox ? (
          <ConfirmBox
            action={setConfirmDelete}
            close={() => setShowConfirmBox(false)}
          />
        ) : null}
      </AnimatePresence>
      <TabNavigation active={currentTab} setActive={setCurrentTab} />

      {todos.length > 0 &&
      todos.filter((todo) => todo.status === statuses[currentTab - 1]).length >
        0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
            2xl:grid-cols-5 pb-2 flex-wrap gap-3 max-h-[calc(100vh-16rem)]
            overflow-auto flex-1"
        >
          {todos
            .filter((todo) => todo.status === statuses[currentTab - 1])
            .map((todo) => (
              <TodoCard
                todo={todo}
                key={todo.id}
                variant={item}
              />
            ))}
        </motion.div>
      ) : (
        <motion.p
          variants={messageVariant}
          initial="hidden"
          animate="visible"
          className="text-gray-500"
        >
          {todoMessage}
        </motion.p>
      )}
    </div>
  );
};
