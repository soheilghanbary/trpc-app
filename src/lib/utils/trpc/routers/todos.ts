import { router, publicProcedure } from "~/lib/utils/trpc/server";
import { z } from "zod";
import { prisma } from "../../db";

const todosRouter = router({
  createTodo: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.todo.create({
        data: { text: input.text, completed: false },
      });
      return {
        msg: "todo was created!",
      };
    }),
  getTodos: publicProcedure.query(async () => {
    return await prisma.todo.findMany();
  }),
  deleteTodo: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.todo.delete({ where: { id: input.id } });
      return "todo was removed!";
    }),
  doneTodo: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const todo = await prisma.todo.findFirst({ where: { id: input.id } });
      await prisma.todo.update({
        where: { id: input.id },
        data: { ...todo, completed: !todo?.completed },
      });
      return "todo was done updated!";
    }),
  updateTodo: publicProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.todo.update({
        where: { id: input.id },
        data: { text: input.text },
      });
      return "todo was updated!";
    }),
});

export default todosRouter;
