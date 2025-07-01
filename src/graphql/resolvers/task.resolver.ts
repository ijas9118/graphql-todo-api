import { TaskModel } from "../../models/task.model";
import { NotFoundError, ValidationError } from "../../utils/errorHandler";

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
      try {
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
      } catch (error) {
        throw new ValidationError("Failed to fetch tasks");
      }
    },
    getTask: async (_: unknown, args: { id: string }) => {
      const task = await TaskModel.findById(args.id);
      if (!task) {
        throw new NotFoundError("Task", args.id);
      }
      return task;
    },
  },

  Mutation: {
    createTask: async (_: unknown, { input }: { input: CreateTaskInput }) => {
      try {
        const task = new TaskModel(input);
        return await task.save();
      } catch {
        throw new ValidationError("Failed to create task");
      }
    },

    updateTask: async (_: unknown, { id, input }: { id: string; input: UpdateTaskInput }) => {
      const task = await TaskModel.findByIdAndUpdate(id, input, { new: true });
      if (!task) {
        throw new NotFoundError("Task", id);
      }
      return task;
    },

    deleteTask: async (_: unknown, { id }: { id: string }) => {
      const result = await TaskModel.findByIdAndDelete(id);
      if (!result) {
        throw new NotFoundError("Task", id);
      }
      return !!result;
    },
  },
};
