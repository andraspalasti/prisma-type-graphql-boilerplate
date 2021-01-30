# prisma-type-graphql-boilerplate

This is a boilerplate using:

* apollo-server-express
* prisma 2
* typescript
* typegraphql
* typegraphql-prisma
* jest

You can run tests with `yarn test`.
You start the server by running:

1. `yarn watch` this starts the typescript compiler in watch mode
2. `yarn dev` this starts the server in the dist folder and watches for file changes made by the typescript compiler

You need to run this when you made changes to your prisma file: `yarn prisma:generate`

If you have any ideas or issues feel free to tell them.
