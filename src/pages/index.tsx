import { api } from "~/lib/utils/trpc/api";

export default function HomePage() {
  const { isLoading, data, error } = api.users.getUsers.useQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>tRPC Data: {data}</h1>
    </div>
  );
}
