import { Arg, Ctx, Field, Info, InputType, Mutation, Query, Resolver } from "type-graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Context } from "../types";
import { User } from "../schema/User";

@InputType()
export class AddUserInput implements Partial<User> {
	@Field()
	email!: string;

	@Field()
	name!: string;
}

@Resolver(() => User)
export class UserResolver {
	@Query(() => [User])
	async users(@Ctx() { prisma }: Context, @Info() info: any) {
		const select = new PrismaSelect(info).value;
		return await prisma.user.findMany({ ...select });
	}

	@Mutation(() => User)
	async addUser(@Arg("data") newUser: AddUserInput, @Ctx() { prisma }: Context, @Info() info: any) {
		const select = new PrismaSelect(info).value;
		return await prisma.user.create({ data: newUser, ...select });
	}
}
