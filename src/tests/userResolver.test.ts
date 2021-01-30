import { test } from "@jest/globals";
import { prisma } from "../startServer";
import { setupTests } from "./setupTest";
import { TestClient } from "./TestClient";

const getUrl = setupTests();

const client = new TestClient(getUrl());

test("new user test", async () => {
	const response = await client.addUser({ email: "ani@skywalker.com", name: "Anakin Skywalker" });
	expect(response.data).toEqual({
		addUser: {
			id: 1,
			email: "ani@skywalker.com",
			name: "Anakin Skywalker",
		},
	});
	expect(await prisma.user.findMany({ where: { email: "ani@skywalker.com" } })).toEqual([
		{
			id: 1,
			email: "ani@skywalker.com",
			name: "Anakin Skywalker",
		},
	]);
});
