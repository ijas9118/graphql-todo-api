import { EventModel } from "../../models/event.model";
import { TaskModel } from "../../models/task.model";

type CreateEventInput = {
  title: string;
  description: string;
  category: string;
};

export const eventResolver = {
  BaseEntity: {
    __resolveType(obj: any) {
      return obj.priority ? "Task" : "Event";
    },
  },

  SearchResult: {
    __resolveType(obj: any) {
      return obj.priority ? "Task" : "Event";
    },
  },

  Query: {
    getEvent: async (_: any, args: { id: string }) => {
      return await EventModel.findById(args.id);
    },
    searchItems: async (_: any, { query }: { query: string }) => {
      const tasks = await TaskModel.find(
        { $text: { $search: query } },
        { score: { $meta: "textScore" } }
      ).sort({
        score: { $meta: "textScore" },
      });

      const events = await EventModel.find(
        { $text: { $search: query } },
        { score: { $meta: "textScore" } }
      ).sort({
        score: { $meta: "textScore" },
      });

      return [...tasks, ...events];
    },
  },

  Mutation: {
    createEvent: async (_: any, { input }: { input: CreateEventInput }) => {
      console.log(input);
      return await EventModel.create(input);
    },
  },
};
