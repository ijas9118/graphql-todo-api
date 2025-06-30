export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const tasks: Task[] = [
  { id: "1", title: "Learn GraphQL", completed: false },
  { id: "2", title: "Build a Todo App", completed: true },
];
