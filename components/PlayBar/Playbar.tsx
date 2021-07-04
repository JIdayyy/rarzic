import { useRecoilState } from "recoil";
import { trackIndex, trackList, isPlaying } from "../../State/States";

export default function Playbar() {
  const [tracks] = useRecoilState(trackList);
  const [index, setIndex] = useRecoilState(trackIndex);
  const [playing, setPlaying] = useRecoilState(isPlaying);

  const handleForward = () => {
    if (index === tracks.length) {
      return setIndex(0);
    }
    setIndex((c) => c + 1);
  };
  const handleBackward = () => {
    if (index === 0) {
      return setIndex(0);
    }
    setIndex((c) => c - 1);
  };

  return (
    <div className="w-full absolute flex justify-between bottom-0 h-20 items-center  bg-Gray">
      <div className="h-full"></div>
      <div className="flex  justify-between">
        <img
          className="h-10 mx-4"
          onClick={handleBackward}
          src={"/controls/backward.png"}
        />
        <img
          className="h-10 mx-4"
          onClick={() => setPlaying(true)}
          src={"/controls/play.png"}
        />
        <img
          className="h-10 mx-4"
          onClick={() => setPlaying(false)}
          src={"/controls/pause.png"}
        />
        <img
          className="h-10 mx-4"
          onClick={handleForward}
          src={"/controls/forward.png"}
        />
        <img
          className="h-10 mx-4"
          onClick={handleForward}
          src={"/controls/repeat.png"}
        />
      </div>
    </div>
  );
}
