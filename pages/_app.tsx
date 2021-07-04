import "tailwindcss/tailwind.css";
import "../style/style.css";
import "../style/scrollbarWebkit.css";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout/Layout";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Layout page="Home">
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
