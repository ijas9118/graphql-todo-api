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
  BaseEntity: {
    __resolveType(obj: any) {
      return obj.priority ? "Task" : "Event";
    },
  },

  Query: {
    getTasks: async (_: unknown, args: { limit?: number; offset?: number }) => {
      const { limit = 10, offset = 0 } = args;

      const [tasks, totalCount] = await Promise.all([
        TaskModel.find().sort({ createdAt: -1 }).skip(offset).limit(limit),
        TaskModel.countDocuments(),
      ]);

      return {
        tasks,
        totalCount,
        limit,
        offset,
        currentPage: Math.floor(offset / limit) + 1,
      };
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
