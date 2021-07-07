import TrackCarroussel from "../components/Carroussel/TrackCarroussel/TrackCarroussel";
import HiddenPlayer from "../components/Player/HiddenPlayer";
import { useRecoilState } from "recoil";
import { useState, useRef, useEffect } from "react";
import { trackList } from "../State/States";
import Error from "../components/Error/Error";
import Loading from "../components/Loading/Loading";
import axios from "axios";
import SearchBar from "../components/SearchBar/SearchBar";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import AlbumCarroussel from "../components/Carroussel/AlbumCarroussel/AlbumCarroussel";
interface IProps {
  datas: Array<ITracks>;
  session: any;
}

export default function Home({ datas, session }: IProps) {
  const [tracks, setTracks] = useRecoilState(trackList);
  const [err] = useState<IError>();

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
    <div className="w-full h-full overflow-auto overflow-y-auto sidebar flex flex-col py-10 md:py-20 px-4 md:px-16 items-center justify-start ">
      <div className="w-full">
        <div className="w-full my-4 h flex md:flex-row justify-between flex-col  ">
          <div className="bg-gray-400 px-2 my-2 text-base text-white font-Share rounded-tl-xl flex justify-center align-middle items-center rounded-tr-xl rounded-bl-xl border-2">
            {" "}
            TOP 10
          </div>
          <SearchBar />
        </div>
        {tracks[0] && <TrackCarroussel ressource="songs" />}
        <div className="w-full my-4 flex md:flex-row flex-col  ">
          <div className="bg-gray-400 px-2 my-2 text-base text-white font-Share rounded-tl-xl flex justify-center align-middle items-center rounded-tr-xl rounded-bl-xl border-2">
            {" "}
            Albums
          </div>
        </div>
        {tracks[0] && <AlbumCarroussel ressource="albums" />}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const data = await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}songs`,
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
