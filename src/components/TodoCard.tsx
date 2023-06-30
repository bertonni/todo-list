import { AnimatePresence, motion, Variants } from "framer-motion";
import { Todo } from "../@types/types";
import { Calendar, MoreHorizontal } from "react-feather";
import { Chip } from "./Chip";
import { MoreOptions } from "./MoreOptions";
import { useEffect, useState } from "react";

interface TodoCardProps {
  todo: Todo;
  variant: Variants;
  showEditTask: boolean;
  changeStatus: () => void;
  showConfirmBox: (value: boolean) => void;
  showEditModal: (value: boolean, task: Todo) => void;
  setTaskId: (id: string) => void;
}

const months: string[] = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
const days: string[] = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const colors: string[] = [
  "primary",
  "info",
  "secondary",
  "neutral",
  "success",
  "warning",
  "error",
];
const categories: string[] = ["Trabalho", "Estudos", "Casa", "Sem Categoria"];

const buttonVariant: Variants = {
  hidden: { opacity: 0, transition: { delay: 0.1 } },
  visible: { opacity: 1, transition: { delay: 0.3 } },
};

export const TodoCard = ({
  todo,
  variant,
  showConfirmBox,
  changeStatus,
  showEditModal,
  showEditTask,
  setTaskId,
}: TodoCardProps) => {
  const { title, description, deadline, category } = todo;
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const getDifferenceDays = (date: Date) => {
    const today = new Date();

    const timeDiff = date.getTime() - today.getTime();

    if (timeDiff < 0) return -1;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
  };

  useEffect(() => {
    if (showEditTask) setShowOptions(false);
  }, [showEditTask]);

  const formatDate = (date: Date) => {
    const dayOfWeek =
      new Date(date).getDay() == 0 ? 6 : new Date(date).getDay() - 1;
    const month = new Date(date).getMonth();
    const dayOfMonth = new Date(date).getDate();
    const year = new Date(date).getFullYear();

    return `${days[dayOfWeek]}, ${dayOfMonth} ${months[month]} ${year}`;
  };

  const dateColorClass: string = "text-gray-400";
  const badgeColor: any = colors[categories.indexOf(category)] ?? "primary";
  const status =
    todo.status === "Canceled"
      ? "Cancelada"
      : todo.status === "Done"
      ? "Concluída"
      : "A fazer";
  const statusColor =
    todo.status === "Canceled"
      ? "error"
      : todo.status === "Done"
      ? "success"
      : "info";

  return (
    <motion.div
      variants={variant}
      className="flex flex-col text-gray-700 rounded-xl shadow
        pt-3 w-full bg-white relative overflow-hidden min-h-[12rem]"
      onClick={() => setShowOptions(false)}
    >
      {/* header */}
      <div className="h-10 flex justify-between items-center px-4 text-gray-500 mb-1">
        <Chip size="sm" color={badgeColor} text={category} />
        <AnimatePresence mode="wait">
          {showOptions ? (
            <MoreOptions
              id={todo.id}
              close={() => setShowOptions(false)}
              showConfirmBox={showConfirmBox}
              showEditModal={showEditModal}
              action={setTaskId}
              status={todo.status}
              changeStatus={changeStatus}
            />
          ) : null}
        </AnimatePresence>
        {!showOptions ? (
          <motion.button
            variants={buttonVariant}
            initial={"hidden"}
            animate="visible"
            className="rounded-full h-max p-1 z-20 flex flex-col absolute top-2
              right-2 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(true);
            }}
            aria-label="more-options"
          >
            <MoreHorizontal />
          </motion.button>
        ) : null}
      </div>

      {/* body */}
      <div className="flex flex-col flex-1 px-4 pb-4">
        <h2 className="text-lg lg:text-xl font-medium">{title}</h2>
        <p className="text-gray-400 line-clamp-2" title={description ?? ""}>
          {description}
        </p>
      </div>

      {/* footer */}
      <div
        className={`flex border-t w-full justify-between py-4 px-3 text-gray-500 ${dateColorClass}`}
      >
        <span>
          {todo.status !== "To do" ? (
            <Chip text={status} size="xs" color={statusColor} />
          ) : null}
        </span>
        <div className="flex items-center">
          <Calendar size={16} />
          <span className="text-xs rounded px-1">{formatDate(deadline)}</span>
        </div>
      </div>
    </motion.div>
  );
};
