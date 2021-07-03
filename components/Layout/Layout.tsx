import Head from "next/head";
import Navbar from "../Layout/Navbar";
import Footer from "./Footer";
interface IProps {
  page: string;
  children: JSX.Element;
}

export default function Layout({ page, children }: IProps): JSX.Element {
  return (
    <div className="w-full bg-rocket bg-cover bg-center flex flex-col items-center align-middle justify-between h-screen">
      <Head>
        <title>{page}</title>
      </Head>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
