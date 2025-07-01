import { EventModel } from "@/models/event.model";
import { TaskModel } from "@/models/task.model";
import { NotFoundError, ValidationError } from "@/utils/errorHandler";

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
      try {
        const event = await EventModel.findById(args.id);
        if (!event) {
          throw new NotFoundError("Event", args.id);
        }
        return event;
      } catch (error) {
        throw new ValidationError("Failed to fetch event");
      }
    },
    searchItems: async (_: any, { query }: { query: string }) => {
      try {
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
      } catch (error) {
        throw new ValidationError("Failed to search items");
      }
    },
  },

  Mutation: {
    createEvent: async (_: any, { input }: { input: CreateEventInput }) => {
      try {
        return await EventModel.create(input);
      } catch (error) {
        throw new ValidationError("Failed to create event");
      }
    },
  },
};
