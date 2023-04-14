import { Todo } from "../@types/types";
import { Edit2, Trash2, CheckCircle, Calendar, MoreHorizontal } from "react-feather";

interface TodoCardProps {
  todo: Todo;
}

const months: string[] = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const days: string[] = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export const TodoCard = ({ todo }: TodoCardProps) => {
  const { title, description, deadline } = todo;

  const getDifferenceDays = (date: Date) => {
    const today = new Date();

    const timeDiff = date.getTime() - today.getTime();

    if (timeDiff < 0) return -1;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
  };

  const formatDate = (date: Date) => {
    const dayOfWeek = date.getDay() == 0 ? 6 : date.getDay() - 1;
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    return `${days[dayOfWeek]}, ${dayOfMonth} ${months[month]} ${year}`;
  }

  const dateColorClass = 'text-gray-400'
  // const dateColorClass =
  //   getDifferenceDays(deadline) < 0
  //     ? "text-red-500"
  //     : getDifferenceDays(deadline) < 6
  //     ? "text-amber-500"
  //     : "text-green-500";

  return (
    <div
      className="flex flex-col justify-between text-gray-700 rounded-xl shadow-md
      pt-3 w-full bg-white"
    >
      {/* header */}
      <div className="h-10 flex justify-between items-center px-4 text-gray-500 mt-1 mb-3">
        <span className="px-2 py-1 rounded-full bg-indigo-100 text-sm font-medium text-indigo-500">Categoria</span>
        <button className="p-1 rounded-full hover:bg-gray-50">
          <MoreHorizontal />
        </button>
      </div>
      
      {/* body */}
      <div className="flex flex-col px-4 pb-4">
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>

      {/* footer */}
      <div className={`flex border-t w-full justify-end py-4 px-3 text-gray-500 ${dateColorClass}`}>
        <Calendar size={16} />
        <span className="text-xs rounded px-1">
          {formatDate(deadline)}
        </span>
      </div>

      <div className="flex-col sm:flex-row items-center justify-end hidden">
        <button
          className="p-2 rounded-full hover:bg-sky-50 transition-all
          text-gray-400 hover:text-sky-400"
        >
          <Edit2 size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-pink-50 transition-all
          text-gray-400 hover:text-pink-400"
        >
          <Trash2 size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-green-50 transition-all
          text-gray-400 hover:text-green-400"
        >
          <CheckCircle size={20} />
        </button>
      </div>
    </div>
  );
};
