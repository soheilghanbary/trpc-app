import '~/lib/sass/globals.scss'
import type { AppProps } from "next/app";
import { api } from "~/lib/utils/trpc/api";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default api.withTRPC(App);
