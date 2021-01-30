import { PrismaClient } from "@prisma/client";

export type Context = {
	prisma: PrismaClient<
		{
			log: ("info" | "query" | "warn" | "error")[];
		},
		never
	>;
};
