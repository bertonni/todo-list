export interface Todo {
  id: string;
  title: string;
  description?: string | null | undefined;
  deadline: Date;
  category: "Trabalho" | "Estudos" | "Casa" | "Sem Categoria";
  status: "Done" | "To do" | "Canceled";
  createdAt: Date;
}

export interface Message {
  variant: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral";
  text: string;
}