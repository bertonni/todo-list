import {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  ReactNode,
} from "react";
import { Todo } from "../@types/types";

interface TodosContextDataProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
}

interface TodosProviderProps {
  children: ReactNode;
}

const defaultTodos: Todo[] = [];

export const TodosContext = createContext({} as TodosContextDataProps);

export const useTodos = (): TodosContextDataProps => {
  const context = useContext(TodosContext);

  return context;
};

export const TodosContextProvider = ({ children }: TodosProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);

  useEffect(() => {
    todos.sort((a, b) => Number(a.deadline) - Number(b.deadline));
    setIsLoading(false);
  }, []);

  const addTodo = (todo: Todo) => {
    todos.push(todo);
    todos.sort((a, b) => Number(a.deadline) - Number(b.deadline));
    setTodos(todos);
  };

  const memoedValues = useMemo(
    () => ({
      todos,
      addTodo,
    }),
    [todos]
  );

  return (
    <TodosContext.Provider value={memoedValues}>
      {!isLoading && children}
    </TodosContext.Provider>
  );
};
