import { AnimatePresence, motion, Variants } from "framer-motion";
import { CheckCircle, Edit2, Trash2, X, XCircle } from "react-feather";
import { useTodos } from "../contexts/TodosContext";
import { useEffect, useState } from "react";
import { ConfirmBox } from "./ConfirmBox";

interface MoreOptionsProps {
  id: string;
  close: () => void;
  showConfirmBox: (value: boolean) => void;
  action: (id: string) => void;
}

const variants: Variants = {
  hidden: { right: 0, x: "100%", transition: { duration: 0.2 } },
  visible: { right: 0, x: 0, transition: { duration: 0.3 } },
};

export const MoreOptions = ({ id, close, showConfirmBox, action }: MoreOptionsProps) => {
  const { finishTodo, cancelTodo } = useTodos();


  const handleRemove = () => {
    showConfirmBox(true);
    action(id);
  };

  const handleFinish = () => {
    finishTodo(id);
  };

  const handleCancel = () => {
    cancelTodo(id);
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
        <button
          title="Fechar"
          className="p-2 hover:bg-white rounded-full"
          onClick={close}
        >
          <X size={20} />
        </button>
        <button
          title="Editar"
          className="p-2 hover:bg-white rounded-full hover:text-sky-500
          transition-all"
        >
          <Edit2 size={20} />
        </button>
        <button
          title="Remover"
          className="p-2 hover:bg-white rounded-full hover:text-red-500
          transition-all"
          onClick={handleRemove}
        >
          <Trash2 size={20} />
        </button>
        <button
          title="Cancelar"
          className="p-2 hover:bg-white rounded-full hover:text-pink-500
          transition-all"
          onClick={handleCancel}
        >
          <XCircle size={20} />
        </button>
        <button
          title="Concluir"
          className="p-2 hover:bg-white rounded-full hover:text-emerald-500
          transition-all"
          onClick={handleFinish}
        >
          <CheckCircle size={20} />
        </button>
      </div>
    </motion.div>
  );
};
