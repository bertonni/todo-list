import { TodoCard } from "../components/TodoCard";
import { useTodos } from "../contexts/TodosContext";

export const Todos = () => {
  const { todos } = useTodos();

  return (
    <div className="rounded p-4 text-gray-700">
      <h1 className="font-medium text-2xl">To-do List</h1>

      <div className="mt-4 flex pb-2 flex-wrap gap-2 flex-1 max-h-[calc(100vh-17rem)] overflow-auto">
        {todos.length > 0 ? (
          todos.map((todo, index) => <TodoCard todo={todo} key={index} />)
        ) : (
          <p className="text-gray-500">There is nothing to do.</p>
        )}
      </div>
    </div>
  );
};
