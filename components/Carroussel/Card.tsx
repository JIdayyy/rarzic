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
      onMouseUp={() => setIsClicked(false)}
      style={background}
      key={index}
      className=" mx-4 border-2 hover:bg-opacity-5 hover:scale-105 rounded-xl flex flex-col  w-96 relative h-full"
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
      {/* <img
        className="h-full  absolute hover:opacity-25 opacity-50 rounded-xl w-full "
        src={track.album.picture ? track.album.picture : "/rocket.png"}
        alt=""
      /> */}
      <button
        onClick={handleClick}
        className="absolute z-50 bottom-0 text-white font-bold p-7 text-2xl"
      >
        <img
          className="w-16 bg-black opacity-60 border-4 rounded-3xl p-2"
          src="/controls/play.png"
          alt=""
        />
      </button>
    </div>
  );
}
