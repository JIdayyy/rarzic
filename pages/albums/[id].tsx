import axios from "axios";
import { NextPageContext } from "next";
import { Params } from "next/dist/next-server/server/router";
import { ContextType, useEffect } from "react";
import { useRecoilState } from "recoil";
import { trackList } from "../../State/States";
import Link from "next/link";
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
    backgroundImage: `url(${
      isLoading || data.data.picture ? "/bg_album.png" : data.data.picture
    })`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
  };
  const background2 = {
    backgroundImage: `url(${isLoading ? "/bg_album.png" : album.picture})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
  };

  return (
    <div className="w-full text-white  font-Share justify-between items-center align-middle flex h-full">
      <div className="w-2/12  flex flex-col bg-Dark_gray items-start align-middle text-center  h-full">
        <ul className="w-full text-xl p-5 flex flex-col items-start justify-center align-middle h-80 full">
          <li className="flex w-full  mx-4 items-center align-middle justify-start">
            <img className="w-5 mx-4 my-4" src="/home.png" alt="" />
            <Link href="/">
              <button>Home</button>
            </Link>
          </li>
          <li className="flex w-full mx-4  items-center align-middle justify-start">
            <img className="w-5 mx-4 my-4" src="/search.png" alt="" />
            <button>Search</button>
          </li>
          <li className="flex w-full mx-4  items-center align-middle justify-start">
            <img className="w-5 mx-4 my-4" src="/playlists.png" alt="" />
            <button>Playlists</button>
          </li>
        </ul>
      </div>
      <div className="w-9/12 flex flex-col h-full bg-Gray mr-10">
        <div className="h-1/5 flex w-full ">
          <div className="w-1/2 p-5 flex ">
            <img className="w-40 h-40" src={"/headphone.png"} />
            <div className=" flex-col p-5 items-center flex justify-center align-middle text-4xl w-full">
              <div className="text-2xl h-full w-full ">{album.title}</div>
              <div className="w-full h-full">
                {!isLoading && data.data.name}
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full z-50 relative" style={background}></div>
        </div>
        <div className="bg-Dark_gray p-10 w-full flex flex-col items-start align-middle h-80">
          <div className="flex items-center align-middle justify-center">
            {" "}
            <img className="w-8 my-2 p-1" src={"/controls/play.png"} alt="" />
            <div className="border mx-4 px-2 py-1 item rounded-md">
              Favorites
            </div>
          </div>
          <div className="text-4xl">Tracks</div>
        </div>
        <div className="flex w-full bg-Dark_gray h-full ">
          <ul className="w-full p-5 flex flex-col">
            {album.songs.map((song) => {
              return (
                <li className="w-full flex items-center justify-between align-middle">
                  <img className="w-10 my-2" src={album.picture} alt="" />
                  <div className="w-full my-2 mx-4">{song.title}</div>
                  <div className="w-full my-2 mx-4">{song.duration}</div>
                </li>
              );
            })}
          </ul>
          <div style={background2} className="w-full h-full"></div>
        </div>
      </div>
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
