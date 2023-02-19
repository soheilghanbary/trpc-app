import {
  createTRPCRouter,
  publicProcedure,
} from "~/lib/utils/trpc/server";

const usersRouter = createTRPCRouter({
  getUsers: publicProcedure.query(() => {
    return "users is success!"
  }),
});

export default usersRouter;
