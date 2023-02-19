import { createTRPCRouter } from "~/lib/utils/trpc/server";
import usersRouter from "./users";

export const appRouter = createTRPCRouter({
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
