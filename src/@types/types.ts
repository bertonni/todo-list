export interface Todo {
  title: string;
  description?: string | null | undefined;
  deadline: Date;
  category: string;
  status: "Done" | "To do" | "Canceled";
  createdAt: string;
}