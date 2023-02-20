import "~/lib/sass/globals.scss";
import type { AppProps } from "next/app";
import { api } from "~/lib/utils/trpc/api";
import Navbar from "~/components/modules/navbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto max-w-md p-2">
      <Navbar />
      <main className="my-2">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default api.withTRPC(App);
