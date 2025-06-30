import { Task, tasks } from "../../data";

type AddTaskInput = {
  title: string;
};

type UpdateTaskInput = {
  title: string;
  completed: boolean;
};

export const taskResolver = {
  Query: {
    getTasks: () => tasks,
    getTask: (_: unknown, args: { id: string }) => tasks.find((task) => task.id === args.id),
  },

  Mutation: {
    addTask: (_: unknown, { task }: { task: AddTaskInput }) => {
      const newTask: Task = {
        id: (tasks.length + 1).toString(),
        title: task.title,
        completed: false,
      };

      tasks.push(newTask);
      return newTask;
    },

    updateTask: (_: unknown, { id, data }: { id: string; data: UpdateTaskInput }) => {
      let task = tasks.find((t) => t.id === id);
      if (!task) return null;

      Object.assign(task, data);
      return task;
    },

    deleteTask: (_: unknown, { id }: { id: string }) => {
      let index = tasks.findIndex((t) => t.id === id);

      if (index > -1) {
        return tasks.splice(index, 1)[0];
      }
      return null;
    },
  },
};
