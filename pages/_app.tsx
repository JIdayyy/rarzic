import "tailwindcss/tailwind.css";
import "../style/style.css";
import { Provider } from "next-auth/client";
import authContext from "../context/authContext";
import "../style/scrollbarWebkit.css";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import { RecoilRoot } from "recoil";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }): JSX.Element {
  const [token, setToken] = useState(null);
  return (
    <authContext.Provider
      value={{
        token,
        setToken,
      }}
    >
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
    </authContext.Provider>
  );
}
