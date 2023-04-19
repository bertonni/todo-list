export interface Todo {
  id: string;
  title: string;
  description?: string | null | undefined;
  deadline: Date;
  category: string;
  status: "Done" | "To do" | "Canceled";
  createdAt: Date;
}

export interface Message {
  variant: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  text: string;
}