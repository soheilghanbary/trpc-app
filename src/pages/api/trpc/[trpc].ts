import * as trpcNext from "@trpc/server/adapters/next";
import { createTRPCContext } from "~/lib/utils/trpc/server";
import { appRouter } from "~/lib/utils/trpc/routers/root";

export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  // onError:
  //   process.env.NODE_ENV === "development"
  //     ? ({ path, error }) => {
  //         console.error(
  //           `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
  //         );
  //       }
  //     : undefined,
});
