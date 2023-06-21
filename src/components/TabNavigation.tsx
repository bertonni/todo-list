import { useTodos } from "../contexts/TodosContext";
import { Badge } from "./Badge";

interface TabNavigationProps {
  active: number;
  setActive: (value: number) => void;
}

export const TabNavigation = ({ active, setActive }: TabNavigationProps) => {
  const { todos } = useTodos();

  const todoCount = todos.filter(todo => todo.status === "To do").length;
  const doneCount = todos.filter(todo => todo.status === "Done").length;
  const canceledCount = todos.filter(todo => todo.status === "Canceled").length;

  return (
    <div
      className="sm:w-fit rounded-lg bg-white my-4 flex items-center
      divide-x h-fit font-medium w-full"
    >
      <div
        className={`px-4 py-2 cursor-pointer ${active === 1 ? 
          'bg-indigo-100 pointer-events-none': "hover:bg-indigo-200"}
          min-w-[80px] sm:min-w-[180px] w-full rounded-l-lg text-center transition-all
          flex items-center justify-between`}
        onClick={() => setActive(1)}
      >
        <span>A fazer 2</span>
        <Badge value={todoCount} />
      </div>
      <div
        className={`px-4 py-2 cursor-pointer ${active === 2 ?
          'bg-indigo-100 pointer-events-none' : "hover:bg-indigo-200"}
          min-w-[80px] sm:min-w-[180px] w-full text-center transition-all
          flex items-center justify-between`}
        onClick={() => setActive(2)}
      >
        <span>Realizadas</span>
        <Badge value={doneCount} />
      </div>
      <div
        className={`px-4 py-2 cursor-pointer ${active === 3 ?
          'bg-indigo-100 pointer-events-none' : "hover:bg-indigo-200"}
          min-w-[80px] sm:min-w-[180px] w-full rounded-r-lg text-center transition-all
          flex items-center justify-between`}
        onClick={() => setActive(3)}
      >
        <span>Canceladas</span>
        <Badge value={canceledCount} />
      </div>
    </div>
  );
};
