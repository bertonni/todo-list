import { TodoCard } from "../components/TodoCard";
import { useTodos } from "../contexts/TodosContext";

export const Todos = () => {
  const { todos } = useTodos();

  return (
    <div className="rounded text-gray-700">
      <h1 className="font-medium text-2xl my-4">Lista de Tarefas</h1>
      {/* <div className="flex pb-2 flex-wrap gap-3 flex-1 max-h-[calc(100vh-15rem)] overflow-auto"> */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
        2xl:grid-cols-5 pb-2 flex-wrap gap-3 flex-1 max-h-[calc(100vh-15rem)]
        overflow-auto">
        {todos.length > 0 ? (
          todos.map((todo, index) => <TodoCard todo={todo} key={index} />)
        ) : (
          <p className="text-gray-500">Não há tarefas cadastradas.</p>
        )}
      </div>
    </div>
  );
};
