import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { config } from 'dotenv';

config();


const startServer = async () => {
  const app: Application = express(); // 🔹 Agrega tipado explícito

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app }); // Debería funcionar correctamente

  app.listen(4000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:4000/graphql");
  });
};

startServer();
