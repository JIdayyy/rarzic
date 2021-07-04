import "tailwindcss/tailwind.css";
import "../style/style.css";
import "../style/playbar.css";
import { Provider, useSession } from "next-auth/client";
import authContext from "../context/authContext";
import "../style/scrollbarWebkit.css";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import { RecoilRoot } from "recoil";
import { useState } from "react";

import Layout from "../components/Layout/Layout";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }): JSX.Element {
  const [session, loading] = useSession();

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
