import { FormEvent, useRef } from "react";
import styles from "~/lib/sass/todos.module.scss";
import { api } from "~/lib/utils/trpc/api";
import toast from "react-hot-toast";

export default function AddTodo() {
  const mutation = api.todos.createTodo.useMutation();
  const context = api.useContext();
  const textRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function add_todo(e: FormEvent) {
    e.preventDefault();
    if (!textRef.current?.value.length) return;
    await mutation.mutate(
      { text: textRef.current?.value },
      {
        onSuccess(data) {
          toast.success(data.msg, {
            icon: "⚡",
            style: {
              borderRadius: "1000px",
              background: "#333",
              color: "#fff",
            },
          });
          return context.todos.invalidate();
        },
      }
    );
    return formRef.current?.reset();
  }

  return (
    <form ref={formRef} onSubmit={add_todo} className={styles["add-todo"]}>
      <input type="text" placeholder="what do you today?" ref={textRef} />
      <button type="submit" disabled={mutation.isLoading}>{mutation.isLoading ? 'Loading ...' : 'Add Todo'}</button>
    </form>
  );
}
