import "tailwindcss/tailwind.css";
import "../style/style.css";
import "../style/playbar.css";
import { Provider } from "next-auth/client";
import "../style/scrollbarWebkit.css";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout/Layout";
import { QueryClientProvider, QueryClient } from "react-query";
import { AppProps } from "next/dist/next-server/lib/router/router";

const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider session={pageProps.session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Layout page="Home">
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </QueryClientProvider>
      </RecoilRoot>
    </Provider>
  );
}
