import { useMemo, useRef, useState } from "react";
import styles from "~/lib/sass/todos.module.scss";
import { api } from "~/lib/utils/trpc/api";
import toast from "react-hot-toast";

interface TodoProps {
  id: string;
  text: string;
  completed: boolean;
  published: Date;
  updated: Date;
}

export default function TodoList() {
  const { isLoading, data: todos } = api.todos.getTodos.useQuery();

  if (isLoading)
    return (
      <div className="mt-4 flex animate-pulse flex-col gap-2">
        <div className="h-20 rounded-lg border border-slate-200 bg-slate-100 py-2 px-4 shadow-md shadow-slate-200"></div>
        <div className="h-20 rounded-lg border border-slate-200 bg-slate-100 py-2 px-4 shadow-md shadow-slate-200"></div>
        <div className="h-20 rounded-lg border border-slate-200 bg-slate-100 py-2 px-4 shadow-md shadow-slate-200"></div>
        <div className="h-20 rounded-lg border border-slate-200 bg-slate-100 py-2 px-4 shadow-md shadow-slate-200"></div>
      </div>
    );

  return (
    <ul className={styles["todo-list"]}>
      {todos?.map((todo, i) => (
        <TodoItem key={i} {...todo} />
      ))}
    </ul>
  );
}

const TodoItem = ({ id, text, completed, published }: TodoProps) => {
  const [editing, setEditing] = useState(false);
  const delete_mutation = api.todos.deleteTodo.useMutation();
  const complete_mutation = api.todos.doneTodo.useMutation();
  const context = api.useContext();
  const [textState, setText] = useState(text);
  const update_mutation = api.todos.updateTodo.useMutation();
  const todo_date = useMemo(() => {
    return published.toLocaleDateString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  function remove_todo() {
    return delete_mutation.mutate(
      { id },
      {
        onSuccess(data) {
          toast.success(data, {
            icon: "❌",
            style: {
              borderRadius: "1000px",
              background: "#333",
              color: "#fff",
            },
          });
          context.todos.invalidate();
        },
      }
    );
  }

  function complete_todo() {
    return complete_mutation.mutate(
      { id },
      {
        onSuccess(data) {
          toast.success(data, {
            icon: "🍆",
            style: {
              borderRadius: "1000px",
              background: "#333",
              color: "#fff",
            },
          });
          context.todos.invalidate();
        },
      }
    );
  }

  function updateTodo(e: any) {
    if (e.keyCode === 13) {
      update_mutation.mutate(
        { id, text: textState },
        {
          onSuccess(data) {
            toast.success(data, {
              icon: "😊",
              style: {
                borderRadius: "1000px",
                background: "#333",
                color: "#fff",
              },
            });
            context.todos.invalidate();
            setEditing(false);
          },
        }
      );
    }
  }

  function updateWithBlur() {
    update_mutation.mutate(
      { id, text: textState },
      {
        onSuccess(data) {
          context.todos.invalidate();
          setEditing(false);
        },
      }
    );
  }

  return (
    <li className={styles["todo-item"]}>
      {editing ? (
        <input
          autoFocus
          onKeyDown={updateTodo}
          onBlur={updateWithBlur}
          onChange={(e) => setText(e.target.value)}
          type="text"
          defaultValue={text}
          className="w-full rounded py-2 px-2 text-sm leading-5 ring-1 ring-indigo-300"
        />
      ) : (
        <p
          onDoubleClick={() => setEditing(true)}
          className={`w-full py-2 text-sm ${
            completed ? "font-medium line-through" : ""
          }`}
        >
          {text}
        </p>
      )}
      <div className={styles["todo-actions"]}>
        <div className="flex items-center gap-2">
          <i className="uil uil-calendar-alt"></i>
          <span className={"text-xs"}>{todo_date}</span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={complete_todo}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-sky-300 bg-sky-300/30 p-2 text-sky-500 duration-150 active:scale-90"
          >
            <i className="uil uil-check"></i>
          </button>
          <button
            disabled={update_mutation.isLoading}
            onClick={() => setEditing(true)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-teal-300 bg-teal-300/30 p-2 text-teal-500 duration-150 active:scale-90"
          >
            <i className="uil uil-edit"></i>
          </button>
          <button
            disabled={delete_mutation.isLoading}
            onClick={remove_todo}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-rose-300 bg-rose-300/30 p-2 text-rose-500 duration-150 active:scale-90"
          >
            <i className="uil uil-trash"></i>
          </button>
        </div>
      </div>
    </li>
  );
};
