import { useEffect, useState } from "react";
import { TabNavigation } from "../components/TabNavigation";
import { TodoCard } from "../components/TodoCard";
import { useTodos } from "../contexts/TodosContext";

const statuses: string[] = ["To do", "Done", "Canceled"];

export const Todos = () => {
  const { todos } = useTodos();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const data = todos.filter(
      (todo) => todo.status === statuses[currentTab - 1]
    );

    if (data.length === 0) {
      switch (currentTab) {
        case 1:
          setMessage("Não há tarefas cadastradas");
          break;
        case 2:
          setMessage("Não há tarefas realizadas");
          break;
        case 3:
          setMessage("Não há tarefas canceladas");
          break;
      }
    } else {
      setMessage("");
    }
  }, [currentTab]);

  return (
    <div className="rounded text-gray-700">
      <h1 className="font-medium text-2xl my-4">Lista de Tarefas</h1>

      <TabNavigation active={currentTab} setActive={setCurrentTab} />

      <div
        className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
        2xl:grid-cols-5 pb-2 flex-wrap gap-3 flex-1 max-h-[calc(100vh-15rem)]
        overflow-auto"
      >
        {todos.length > 0 ? (
          todos
            .filter((todo) => todo.status === statuses[currentTab - 1])
            .map((todo, index) => <TodoCard todo={todo} key={index} />)
        ) : message.length !== 0 ? (
          <p className="text-gray-500">{message}</p>
        ) : null}
      </div>
    </div>
  );
};
