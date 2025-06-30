import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { taskTypedef } from "./typedefs/task.type";
import { taskResolver } from "./resolvers/task.resolver";

export const typeDefs = mergeTypeDefs([taskTypedef]);

export const resolvers = mergeResolvers([taskResolver]);
