import { router, publicProcedure } from "~/lib/utils/trpc/server";

const usersRouter = router({
  getUsers: publicProcedure.query(() => {
    return "users is success!";
  }),
});

export default usersRouter;
