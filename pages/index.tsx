import Carroussel from "../components/Carroussel/Carroussel";
import HiddenPlayer from "../components/Player/HiddenPlayer";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { trackList } from "../State/States";
import Playbar from "../components/PlayBar/Playbar";
import Error from "../components/Error/Error";
import Loading from "../components/Loading/Loading";
import axios from "axios";

export default function Home() {
  const [tracks, setTracks] = useRecoilState(trackList);
  const [err, setErr] = useState<IError>();
  const { data, isLoading, error } = useQuery("tracks", () => {
    axios({
      url: process.env.NEXT_PUBLIC_API_URL,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    })
      .then((r) => setTracks(r.data as any))
      .catch((err) => setErr(err));
  });

  if (err) {
    return <Error message={err.message} />;
  }
  if (!tracks[0]) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-col py-20 px-4 md:px-16 items-center justify-start ">
      <div className="w-full flex flex-col items-start align-middle justify-center ">
        <div className="bg-gray-400 px-4 py-2 text-4xl text-white font-Share rounded-tl-xl flex justify-center  rounded-tr-xl rounded-bl-xl border-2">
          {" "}
          TOP 10
        </div>
      </div>
      {tracks[0] && <Carroussel />}
      {tracks[0] && <HiddenPlayer />}
      <Playbar />
    </div>
  );
}
