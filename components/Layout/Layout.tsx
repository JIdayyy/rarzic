import Head from "next/head";
import { useSession } from "next-auth/client";
import Navbar from "../Layout/Navbar";
import Footer from "./Footer";
import router from "next/router";
import Loading from "../Loading/Loading";
import Playbar from "../PlayBar/Playbar";
import { useEffect } from "react";
import { trackList, userState } from "../../State/States";
import { useRecoilState } from "recoil";
interface IProps {
  page: string;
  children: JSX.Element;
}

export default function Layout({ page, children }: IProps): JSX.Element {
  const [session, loading] = useSession();
  const [user, setUser] = useRecoilState<Session["user"]>(userState);
  const [tracks] = useRecoilState(trackList);
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/login");
  //   } else if (session.user) {
  //     setUser({
  //       ...user,
  //       firstname: session.user.name!,
  //       email: session.user.email!,
  //       image: session.user.image!,
  //     });
  //     router.push("/");
  //   }
  // }, [session, loading]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div
      className="w-full bg-gradient-to-tr from-black via-Dark_gray to-black
    bg-cover  max-h-screen bg-center flex flex-col items-center align-middle justify-between  h-screen"
    >
      <Head>
        <title>{page}</title>
      </Head>
      <Navbar />
      {children}
      {tracks.length > 0 ? <Playbar /> : ""}
    </div>
  );
}
