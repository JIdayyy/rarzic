import Carroussel from "../components/Carroussel/Carroussel";
import HiddenPlayer from "../components/Player/HiddenPlayer";
import { useQuery, QueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { useState, useRef, useEffect } from "react";
import { onSearch, trackList, userState } from "../State/States";
import Playbar from "../components/PlayBar/Playbar";
import Error from "../components/Error/Error";
import Loading from "../components/Loading/Loading";
import axios from "axios";
import SearchBar from "../components/SearchBar/SearchBar";
export default function Home({ datas }) {
  const [tracks, setTracks] = useRecoilState(trackList);

  const [err, setErr] = useState<IError>();
  const audioRef = useRef<HTMLAudioElement>();

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
      <div className="w-full  flex md:flex-row-reverse flex-col items-center align-middle justify-between ">
        <SearchBar />
        <div className="bg-gray-400 px-4 my-2 md:my-0 py-2 text-xl text-white font-Share rounded-tl-xl flex justify-center  rounded-tr-xl rounded-bl-xl border-2">
          {" "}
          TOP 10
        </div>
      </div>
      {tracks[0] && <Carroussel />}
      {tracks[0] && <HiddenPlayer audioRef={audioRef} />}
      <Playbar audioRef={audioRef} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await axios({
    url: process.env.NEXT_PUBLIC_API_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });
  console.log(data.data);
  return {
    props: {
      datas: data.data,
    }, // will be passed to the page component as props
  };
}
