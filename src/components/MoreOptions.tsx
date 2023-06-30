import { motion, Variants } from "framer-motion";
import {
  CheckCircle,
  CornerUpLeft,
  Edit2,
  Trash2,
  X,
  XCircle,
} from "react-feather";
import { useTodos } from "../contexts/TodosContext";
import { Todo } from "../@types/types";
import { Button } from "./Button";

interface MoreOptionsProps {
  id: string;
  close: () => void;
  changeStatus: () => void;
  showConfirmBox: (value: boolean) => void;
  showEditModal: (value: boolean, task: Todo) => void;
  action: (id: string) => void;
  status: "Done" | "To do" | "Canceled";
}

const variants: Variants = {
  hidden: { right: 0, x: "100%", transition: { duration: 0.2 } },
  visible: { right: 0, x: 0, transition: { duration: 0.3 } },
};

export const MoreOptions = ({
  id,
  status,
  close,
  changeStatus,
  showConfirmBox,
  showEditModal,
  action,
}: MoreOptionsProps) => {
  const { changeTodoStatus, cancelTodo, todos } = useTodos();

  const handleRemove = () => {
    showConfirmBox(true);
    action(id);
  };

  const handleEdit = () => {
    const currentTask = todos.filter((todo) => todo.id === id)[0];
    showEditModal(true, currentTask);
  };

  const handleFinish = () => {
    changeTodoStatus(id, "Done");
    changeStatus();
  };

  const handleCancel = (action: "Done" | "To do" | "Canceled") => {
    if (status === "Canceled" || status === "Done")
      changeTodoStatus(id, action);
    else cancelTodo(id);
    changeStatus();
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit={"hidden"}
      className="rounded-r-lg h-full z-10 flex flex-col absolute top-0
        right-0 border-l w-max bg-gray-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-full p-2 flex flex-col justify-evenly">
        <Button title="Fechar" onClick={close}>
          <X size={20} />
        </Button>
        <Button
          iconColor="hover:text-sky-500"
          title="Editar"
          onClick={handleEdit}
        >
          <Edit2 size={20} />
        </Button>
        <Button
          iconColor="hover:text-red-500"
          title="Remover"
          onClick={handleRemove}
        >
          <Trash2 size={20} />
        </Button>
        {status === "Canceled" || status === "Done" ? (
          <Button
            iconColor="hover:text-pink-500"
            title={
              status === "Canceled" || status === "Done"
                ? "Reativar"
                : "Cancelar"
            }
            onClick={() => handleCancel("To do")}
          >
            <CornerUpLeft size={20} />
          </Button>
        ) : (
          <Button
            iconColor="hover:text-pink-500"
            title="Cancelar"
            onClick={() => handleCancel("Canceled")}
          >
            <XCircle size={20} />
          </Button>
        )}
        {status === "Done" ? (
          <Button
            iconColor="hover:text-pink-500"
            title="Cancelar"
            onClick={() => handleCancel("Canceled")}
          >
            <XCircle size={20} />
          </Button>
        ) : (
          <Button
            title="Concluir"
            onClick={handleFinish}
            iconColor="hover:text-emerald-500"
          >
            <CheckCircle size={20} />
          </Button>
        )}
      </div>
    </motion.div>
  );
};
