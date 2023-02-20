import { Toaster } from "react-hot-toast";
import AddTodo from "~/components/modules/add-todo";
import TodoList from "~/components/modules/todo-list";

export default function HomePage() {
  return (
    <div className="my-4">
      <AddTodo />
      <TodoList />
      <Toaster />
    </div>
  );
}
