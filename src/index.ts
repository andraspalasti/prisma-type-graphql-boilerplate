import { prisma, startServer } from "./startServer";

startServer()
	.catch((e) => {
		console.log(e);
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
