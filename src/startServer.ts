import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Context } from "./types";
import { UserResolver } from "./resolvers/UserResolver";
import { __test__ } from "./constants";
import { Server } from "http";

export const prisma = new PrismaClient({
	log: __test__ ? [] : ["query", "info", "warn", "error"],
	datasources: {
		db: {
			url: __test__ ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
		},
	},
});

export const startServer = async (port?: number): Promise<Server> => {
	const schema = await buildSchema({
		resolvers: [UserResolver],
		validate: false,
	});

	await prisma.$connect();
	const apolloServer = new ApolloServer({ schema, context: (): Context => ({ prisma }) });
	const app = express();
	apolloServer.applyMiddleware({ app });

	const currentPort = port || process.env.PORT;
	const server = app.listen({ port: currentPort }, () =>
		console.log(`Server ready at http://localhost:${currentPort}${apolloServer.graphqlPath}`)
	);
	return server;
};
