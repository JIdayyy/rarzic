import Image from "next/image";
import { useRecoilState } from "recoil";
import { trackIndex, trackList, isPlaying } from "../../State/States";

export default function NewCard({ index, track, setIsClicked }) {
  const background = {
    backgroundImage: `url(${
      track.album.picture ? track.album.picture : "/rocket.png"
    })`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
  };
  const [playing, setIsPlaying] = useRecoilState(isPlaying);
  const [trackStateIndex, setTrackStateIndex] = useRecoilState(trackIndex);
  const handleClick = () => {
    setTrackStateIndex(index);
    setIsPlaying(true);
  };
  return (
    <div className="mx-4 bg-Gray relative  rounded-sm p-2 w-60 h-full">
      <div
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(true)}
        style={background}
        className=" rounded-md w-full h-4/6"
      ></div>
      <div className="w-40 text-white flex flex-col font-Share  overflow-ellipsis p-4  h-full">
        <span className="font-bold  w-full"> {track.artist.name}</span>
        <span className="text-sm overflow-ellipsis  w-full">{track.title}</span>
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
              height={25}
              src={"/controls/play.png"}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
