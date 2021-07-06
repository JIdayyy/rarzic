import Carroussel from "../components/Carroussel/Carroussel";
import HiddenPlayer from "../components/Player/HiddenPlayer";
import { useRecoilState } from "recoil";
import { useState, useRef, useEffect } from "react";
import { trackList } from "../State/States";
import Playbar from "../components/PlayBar/Playbar";
import Error from "../components/Error/Error";
import Loading from "../components/Loading/Loading";
import axios from "axios";

import { NextPageContext } from "next";
import { getSession } from "next-auth/client";

interface IProps {
  datas: Array<ITracks>;
  session: any;
}

export default function Home({ datas, session }: IProps) {
  const [tracks, setTracks] = useRecoilState(trackList);
  const [err] = useState<IError>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setTracks(datas);
  }, []);
  if (err) {
    return <Error message={err.message} />;
  }
  if (!tracks[0]) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full  overflow-x-hidden flex flex-col py-10 md:py-20 px-4 md:px-16 items-center justify-start ">
      {tracks[0] && <Carroussel />}
      {tracks[0] && <HiddenPlayer audioRef={audioRef} />}
      <Playbar audioRef={audioRef} />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const data = await axios({
    url: process.env.NEXT_PUBLIC_API_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });

  return {
    props: {
      datas: data.data,
      session: session,
    }, // will be passed to the page component as props
  };
}
