import { useEffect, useState } from "react";
import { TabNavigation } from "../components/TabNavigation";
import { TodoCard } from "../components/TodoCard";
import { useTodos } from "../contexts/TodosContext";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Todo } from "../@types/types";
import { ConfirmBox } from "../components/ConfirmBox";
import { EditTaskModal } from "../components/EditTaskModal";

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

export const TodosScreen = () => {
  const { todos, removeTodo } = useTodos();
  const [currentTab, setCurrentTab] = useState(1);
  const [todoMessage, setTodoMessage] = useState("Não há tarefas cadastradas");
  const [taskId, setTaskId] = useState("");

  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  useEffect(() => {
    if (confirmDelete) {
      removeTodo(taskId);
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  useEffect(() => {
    const data = todos.filter(
      (todo) => todo.status === statuses[currentTab - 1]
    );

    if (data.length === 0) {
      switch (currentTab) {
        case 1:
          setTodoMessage("Não há tarefas a fazer");
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
  }, [currentTab, todos]);

  const handleShowEditModal = (value: boolean, task: Todo) => {
    setShowEditTaskModal(value);
    setSelectedTask(task);
  };

  const handleCloseEditModal = () => {
    setSelectedTask(null);
    setShowEditTaskModal(false);
  };

  return (
    <div className="rounded text-gray-700">
      <h1 className="font-medium text-3xl lg:text-5xl my-6">
        Lista de Tarefas
      </h1>
      <AnimatePresence mode="wait">
        {showEditTaskModal && selectedTask ? (
          <EditTaskModal task={selectedTask} close={handleCloseEditModal} />
        ) : null}
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
            2xl:grid-cols-5 flex-wrap gap-3 max-h-[calc(100vh-14rem)]
            overflow-auto flex-1 pb-16"
        >
          {todos
            .filter((todo) => todo.status === statuses[currentTab - 1])
            .map((todo) => (
              <TodoCard
                todo={todo}
                key={todo.id}
                variant={item}
                showConfirmBox={setShowConfirmBox}
                showEditModal={handleShowEditModal}
                showEditTask={showEditTaskModal}
                setTaskId={setTaskId}
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
