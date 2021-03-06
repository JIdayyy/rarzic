import Image from "next/image";
import { Dispatch } from "react";
import { useRecoilState } from "recoil";
import { trackIndex, isPlaying, trackList } from "../../../State/States";

interface ICard {
  index: number;
  track?: ITracks;
  album?: IAlbum;
  data: ITracks[];
  setIsClicked: Dispatch<boolean>;
}

export default function NewCard({
  index,
  track,
  data,
  setIsClicked,
}: ICard): JSX.Element {
  const background = {
    backgroundImage: `url(${
      track?.album.picture ? track.album.picture : "/rocket.png"
    })`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
  };
  const [, setIsPlaying] = useRecoilState(isPlaying);
  const [, setTrackStateIndex] = useRecoilState(trackIndex);
  const [tracks, setTracks] = useRecoilState(trackList);
  const handleClick = () => {
    setTracks(data);
    setTrackStateIndex(index);
    setIsPlaying(true);
  };
  const trackDuration = track?.duration.split(".")[0];

  return (
    <div
      onClick={handleClick}
      className="mx-4 bg-Dark_gray relative hover:scale-110 cursor-pointer shadow-searchbar  shadow-inner drop-shadow-2xl rounded-sm p-2 w-48 h-64"
    >
      <div
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        style={background}
        className="shadow-searchbar rounded-md w-full h-4/6"
      ></div>
      <div className="w-40 text-white flex flex-col font-Share justify-between items-center align-middle  overflow-ellipsis p-4  ">
        <span className="font-bold text-xs w-full"> {track?.artist.name}</span>
        <span className="text-xs overflow-ellipsis  w-full">
          {track?.title}
        </span>
        <span className="text-xs overflow-ellipsis w-full">
          {trackDuration}
        </span>
      </div>
      <div className="w-full items-end justify-end flex  ">
        <button className="absolute right-0  z-50 bottom-0 font-bold  text-lg">
          <div className="  items-end justify-end active:bg-gray-600 active:scale-90 rounded-full p-3">
            <Image
              quality={100}
              width={20}
              className="hover:scale-110 active:scale"
              height={15}
              src={"/controls/play.png"}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
