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
  finishTodo: (id: string) => void;
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
  
  const removeTodo = (id: string) => {
    const newTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    setMessage({
      variant: "success",
      text: "Tarefa removida com sucesso!",
    });
    setTodos(newTodos);
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  
  const finishTodo = (id: string) => {
    const currentTask: Todo = todos.filter((todo) => todo.id === id)[0];
    const updatedTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    currentTask.status = "Done";
    updatedTodos.push(currentTask);
    setMessage({
      variant: "success",
      text: "A tarefa foi marcada como realizada!",
    });
    window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
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
      cancelTodo,
      finishTodo,
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
