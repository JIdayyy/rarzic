import Image from "next/image";
import { useRecoilState } from "recoil";
import { trackIndex, trackList, isPlaying } from "../../State/States";
export default function Card({ index, track, setIsClicked }) {
  const [playing, setIsPlaying] = useRecoilState(isPlaying);
  const [trackIndes, setTrackIndex] = useRecoilState(trackIndex);

  const background = {
    backgroundImage: `url(${
      track.album.picture ? track.album.picture : "/rocket.png"
    })`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
  };

  const handleClick = () => {
    setTrackIndex(index);
    setIsPlaying(true);
  };
  return (
    <div
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(true)}
      style={background}
      key={index}
      className=" mx-4 border-2  hover:scale-105 h-full flex flex-col  w-96 relative "
    >
      <span className=" z-40 text-white font-bold p-7 text-2xl">
        {track.title}
      </span>
      <span className=" z-40 text-white font-bold p-7 text-2xl">
        {track.artist.name}
      </span>
      <span className=" w-full h-full hover:block hidden z-40 text-white font-bold p-7 text-2xl">
        {track.duration}
      </span>

      <button
        onClick={handleClick}
        className="absolute z-50 bottom-0 text-white font-bold p-7 text-2xl"
      >
        <div className="border-4 w-full items-end justify-end active:bg-gray-600 active:scale-90 rounded-full p-3">
          <Image width={20} height={25} src={"/controls/play.png"} />
        </div>
      </button>
    </div>
  );
}
