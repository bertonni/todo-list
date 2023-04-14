export interface Todo {
  title: string;
  description?: string | null | undefined;
  deadline: Date;
  status: "Done" | "To do" | "Canceled";
  createdAt: string;
}