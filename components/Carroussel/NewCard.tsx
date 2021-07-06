import Image from "next/image";
import { Dispatch } from "react";
import { useRecoilState } from "recoil";
import { trackIndex, isPlaying } from "../../State/States";

interface ICard {
  index: number;
  track: ITracks;
  setIsClicked: Dispatch<boolean>;
}

export default function NewCard({
  index,
  track,
  setIsClicked,
}: ICard): JSX.Element {
  const background = {
    backgroundImage: `url(${
      track.album.picture ? track.album.picture : "/rocket.png"
    })`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
  };
  const [, setIsPlaying] = useRecoilState(isPlaying);
  const [, setTrackStateIndex] = useRecoilState(trackIndex);
  const handleClick = () => {
    setTrackStateIndex(index);
    setIsPlaying(true);
  };
  return (
    <div className="mx-4 bg-Gray relative hover:scale-110   rounded-sm p-2 w-60 h-96">
      <div
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        style={background}
        className=" rounded-md w-full h-4/6"
      ></div>
      <div className="w-40 text-white flex flex-col font-Share justify-between items-center align-middle  overflow-ellipsis p-4  ">
        <span className="font-bold  w-full"> {track.artist.name}</span>
        <span className="text-sm overflow-ellipsis  w-full">{track.title}</span>
        <span className="text-sm overflow-ellipsis w-full">
          {track.duration}
        </span>
      </div>
      <div className="w-full items-end justify-end flex  ">
        <button
          onClick={handleClick}
          className="absolute right-0  z-50 bottom-0 font-bold p-7 text-2xl"
        >
          <div className="  items-end justify-end active:bg-gray-600 active:scale-90 rounded-full p-3">
            <Image
              quality={100}
              width={30}
              className="hover:scale-110 active:scale"
              height={25}
              src={"/controls/play.png"}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
