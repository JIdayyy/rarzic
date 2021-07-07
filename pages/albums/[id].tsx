import axios from "axios";
import { NextPageContext } from "next";
import { Params } from "next/dist/next-server/server/router";
import { ContextType, useEffect } from "react";
import { useRecoilState } from "recoil";
import { trackList } from "../../State/States";
import HiddenPlayer from "../../components/Player/HiddenPlayer";
import Link from "next/link";
import Playbar from "../../components/PlayBar/Playbar";
import Image from "next/image";
import { useQuery } from "react-query";
import { isPlaying, playerState } from "../../State/States";
import { useRef } from "react";
export default function Playlist({ album }: any) {
  const [playing, setPlaying] = useRecoilState(isPlaying);
  const [tracks, setTracks] = useRecoilState(trackList);
  const [player, setPlayer] = useRecoilState(playerState);
  const audioRef = useRef();
  const { data, isLoading } = useQuery("artists", () =>
    axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}artists/${album.artistId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    })
  );
  const background = {
    backgroundImage: `url(${isLoading ? "/bg_album.png" : data.data.picture})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
  };

  useEffect(() => {
    if (
      audioRef.current &&
      Math.floor(audioRef.current.currentTime) !== player.currentTime
    )
      audioRef.current.currenTime = player.currentTime;
    console.log(player.currentTime, Math.floor(audioRef.current.currentTime));
  }, [player]);

  return (
    <div className="w-full text-white justify-between items-center align-middle flex h-full">
      <div className="w-2/12 flex flex-col items-center text-center bg-black bg-opacity-90 h-full">
        <ul className="w-full">
          <li>
            <Link href="/">
              <button>Home</button>
            </Link>
          </li>
          <li>Search</li>
          <li>Playlists</li>
        </ul>
      </div>
      <div className="w-9/12 flex flex-col h-full bg-Gray ">
        <div className="h-1/5 flex w-full ">
          <div className="w-1/2 p-10 flex ">
            <img className="w-40 h-40" src={"/headphone.png"} />
            <div className="flex flex-col w-full">
              <div>{album.title}</div>
              <div>{!isLoading && data.data.name}</div>
            </div>
          </div>
          <div className="w-1/2 h-full z-50 relative" style={background}></div>
        </div>
        <div></div>
      </div>
      <Playbar audioRef={audioRef} />
      {tracks[0] && <HiddenPlayer audioRef={audioRef} />}
    </div>
  );
}

export async function getServerSideProps(context: Params) {
  const { id } = context.params;
  console.log(context.params);
  const data = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}albums/${id}`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });

  return {
    props: {
      album: data.data,
    },
  };
}
