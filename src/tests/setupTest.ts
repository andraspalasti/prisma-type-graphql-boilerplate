import { prisma, startServer } from "../startServer";
import util from "util";
import { exec } from "child_process";
import { Server } from "http";

const execute = util.promisify(exec);

export const setupTests = () => {
	const PORT = 3000;
	const graphqlPath = "/graphql";
	let server: Server;

	beforeAll(async (done) => {
		server = await startServer(PORT);

		await prisma.$queryRaw("DROP SCHEMA IF EXISTS public CASCADE");
		await execute(`export DATABASE_URL='${process.env.TEST_DATABASE_URL}'; yarn prisma:deploy`);
		done();
	});

	afterAll(async (done) => {
		await prisma.$disconnect();
		server.close();
		done();
	});
	return () => `http://localhost:${PORT}${graphqlPath}`;
};
