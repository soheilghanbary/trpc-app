import { api } from "~/lib/utils/trpc/api";

export default function Navbar() {
  const { data: todos } = api.todos.getTodos.useQuery()
  return (
    <nav className="flex items-center rounded-lg bg-white p-3 shadow-md shadow-slate-200">
      <h3 className="font-semibold text-indigo-500">Todino: {todos?.length}</h3>
    </nav>
  );
}
