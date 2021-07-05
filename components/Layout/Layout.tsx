import Head from "next/head";
import { useSession } from "next-auth/client";
import Navbar from "../Layout/Navbar";
import Footer from "./Footer";
import router from "next/router";
import Loading from "../Loading/Loading";
import { useEffect } from "react";
import { userState } from "../../State/States";
import { useRecoilState } from "recoil";
interface IProps {
  page: string;
  children: JSX.Element;
}

export default function Layout({ page, children }: IProps): JSX.Element {
  const [session, loading] = useSession();
  const [user, setUser] = useRecoilState<Session["user"]>(userState);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else if (session.user) {
      setUser({
        ...user,
        firstname: session.user.name!,
        email: session.user.email!,
        image: session.user.image!,
      });
      router.push("/");
    }
  }, [session, loading]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full bg-rocket bg-cover overflow-x-hidden bg-center flex flex-col items-center align-middle justify-between h-screen">
      <Head>
        <title>{page}</title>

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Next.js PWA Example</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Navbar />

      {children}
      <Footer />
    </div>
  );
}
