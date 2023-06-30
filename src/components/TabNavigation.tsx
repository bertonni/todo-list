import { useTodos } from "../contexts/TodosContext";
import { Badge } from "./Badge";

interface TabNavigationProps {
  active: number;
  setActive: (value: number) => void;
}

export const TabNavigation = ({ active, setActive }: TabNavigationProps) => {
  const { todos } = useTodos();

  const todoCount = todos.filter((todo) => todo.status === "To do").length;
  const doneCount = todos.filter((todo) => todo.status === "Done").length;
  const canceledCount = todos.filter(
    (todo) => todo.status === "Canceled"
  ).length;

  return (
    <div
      className="sm:w-fit rounded-full bg-white my-4 lg:my-8 flex items-center
      divide-x h-10 lg:h-12 w-full"
    >
      <div
        className={`tab-button rounded-l-full ${
          active === 1
            ? "bg-indigo-100 pointer-events-none"
            : "hover:bg-gray-50"
        }`}
        onClick={() => setActive(1)}
      >
        <span>A fazer</span>
        <Badge value={todoCount} />
      </div>
      <div
        className={`tab-button ${
          active === 2
            ? "bg-indigo-100 pointer-events-none"
            : "hover:bg-gray-50"
        }`}
        onClick={() => setActive(2)}
      >
        <span>Concluídas</span>
        <Badge value={doneCount} />
      </div>
      <div
        className={`tab-button rounded-r-full ${
          active === 3
            ? "bg-indigo-100 pointer-events-none"
            : "hover:bg-gray-50"
        }`}
        onClick={() => setActive(3)}
      >
        <span>Canceladas</span>
        <Badge value={canceledCount} />
      </div>
    </div>
  );
};
