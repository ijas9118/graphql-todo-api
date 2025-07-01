import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { taskTypedef } from "./typedefs/task.typeDefs";
import { taskResolver } from "./resolvers/task.resolver";
import { eventTypedef } from "./typedefs/event.typeDefs";
import { eventResolver } from "./resolvers/event.resolver";

export const typeDefs = mergeTypeDefs([taskTypedef, eventTypedef]);

export const resolvers = mergeResolvers([taskResolver, eventResolver]);
