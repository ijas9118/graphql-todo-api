import mongoose, { Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  category: string;
  completed: boolean;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ title: "text", description: "text" });

export const EventModel = mongoose.model<IEvent>("Event", eventSchema);
