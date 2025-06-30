import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { resolvers, typeDefs } from "./graphql/schema";
import mongoose from "mongoose";

async function main() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  await mongoose.connect("mongodb://localhost:27017/graphql-todo");
  console.log("Connected to MongoDB");

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  await new Promise<void>((resolve) => httpServer.listen({ port: 3000 }, resolve));
  console.log(`Server ready at http://localhost:3000/graphql`);
}

main();
