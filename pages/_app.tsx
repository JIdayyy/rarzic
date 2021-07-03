import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout/Layout";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Layout page="Home">
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
