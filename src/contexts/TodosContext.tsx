import {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  ReactNode,
} from "react";
import { Message, Todo } from "../@types/types";

interface TodosContextDataProps {
  todos: Todo[];
  message: Message;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
  changeTodoStatus: (id: string, status: "Done" | "To do" | "Canceled") => void;
  cancelTodo: (id: string) => void;
  setMessage: (message: Message) => void;
}

interface TodosProviderProps {
  children: ReactNode;
}

const defaultTodos: Todo[] = [
  {
    id: "todo-1",
    category: "Trabalho",
    title: "Minha primeira tarefa",
    deadline: new Date(),
    createdAt: new Date(),
    status: "To do",
    description: "Descrição da minha primeira tarefa",
  },
  {
    id: "todo-2",
    category: "Trabalho",
    title: "Outra tarefa",
    deadline: new Date(),
    createdAt: new Date(),
    status: "To do",
    description: "Descrição da minha segunda tarefa",
  },
];

const defaultMessage: Message = {
  variant: "primary",
  text: ""
}

export const TodosContext = createContext({} as TodosContextDataProps);

export const useTodos = (): TodosContextDataProps => {
  const context = useContext(TodosContext);

  return context;
};

const localTodos = window.localStorage.getItem("todos");
const localData = localTodos ? JSON.parse(localTodos) : defaultTodos;

export const TodosContextProvider = ({ children }: TodosProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>(localData);
  const [message, setMessage] = useState<Message>(defaultMessage);

  useEffect(() => {
    todos.sort((a, b) => Number(a.deadline) - Number(b.deadline));
    setIsLoading(false);
  }, []);

  const addTodo = (todo: Todo) => {
    todos.push(todo);
    todos.sort((a, b) => Number(a.deadline) - Number(b.deadline));
    setMessage({
      variant: "success",
      text: "Tarefa adicionada com sucesso!",
    });
    window.localStorage.setItem("todos", JSON.stringify(todos));
    setTodos(todos);
  };

  const updateTodo = (todo: Todo) => {
    const todoIndex = todos.findIndex((task) => task.id === todo.id);
    todos[todoIndex] = todo;
    setMessage({
      variant: "success",
      text: "Tarefa atualizada com sucesso!",
    });
    todos.sort((a, b) => Number(a.deadline) - Number(b.deadline));
    setTodos(todos);
    window.localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  const removeTodo = (id: string) => {
    const newTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    setMessage({
      variant: "success",
      text: "Tarefa removida com sucesso!",
    });
    setTodos(newTodos);
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
  };
 
  const changeTodoStatus = (id: string, status: "Done" | "To do" | "Canceled") => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    todos[todoIndex].status = status    
    const action = status === "To do" ? "reativada" : "concluída";

    setMessage({
      variant: "success",
      text: `A tarefa foi ${action} com sucesso!`,
    });
    window.localStorage.setItem("todos", JSON.stringify(todos));
    setTodos(todos);
  }
  
  const cancelTodo = (id: string) => {
    const currentTask: Todo = todos.filter((todo) => todo.id === id)[0];
    const updatedTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    currentTask.status = "Canceled";
    updatedTodos.push(currentTask);
    setMessage({
      variant: "success",
      text: "A tarefa foi cancelada com sucesso!",
    });
    window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  }

  const memoedValues = useMemo(
    () => ({
      todos,
      message,
      addTodo,
      removeTodo,
      updateTodo,
      cancelTodo,
      changeTodoStatus,
      setMessage,
    }),
    [todos, message]
  );

  return (
    <TodosContext.Provider value={memoedValues}>
      {!isLoading && children}
    </TodosContext.Provider>
  );
};
