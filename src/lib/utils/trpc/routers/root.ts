import { createTRPCRouter } from "~/lib/utils/trpc/server";
import usersRouter from "./users";
import todosRouter from "./todos";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  todos: todosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
