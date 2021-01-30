import { Field, ObjectType } from "type-graphql";
import { Post, User as UserWithoutRelations } from "@generated/type-graphql";

@ObjectType()
export class User extends UserWithoutRelations {
	@Field(() => [Post])
	posts!: Post[];
}
