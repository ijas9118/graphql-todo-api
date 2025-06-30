import { Task, tasks } from "../../data";
import { TaskModel } from "../../models/task.model";

type CreateTaskInput = {
  title: string;
  description: string;
  priority: string;
};

type UpdateTaskInput = {
  title: string;
  description: string;
  priority: string;
  completed: boolean;
};

export const taskResolver = {
  Query: {
    getTasks: async () => {
      return await TaskModel.find().sort({ createdAt: -1 });
    },
    getTask: async (_: unknown, args: { id: string }) => {
      return await TaskModel.findById(args.id);
    },
  },

  Mutation: {
    createTask: async (_: unknown, { input }: { input: CreateTaskInput }) => {
      const task = new TaskModel(input);
      return await task.save();
    },

    updateTask: async (_: unknown, { id, input }: { id: string; input: UpdateTaskInput }) => {
      return await TaskModel.findByIdAndUpdate(id, input, { new: true });
    },

    deleteTask: async (_: unknown, { id }: { id: string }) => {
      const result = await TaskModel.findByIdAndDelete(id);
      return !!result;
    },
  },
};
