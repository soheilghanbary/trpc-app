import { router } from "~/lib/utils/trpc/server";
import usersRouter from "./users";
import todosRouter from "./todos";

export const appRouter = router({
  users: usersRouter,
  todos: todosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
