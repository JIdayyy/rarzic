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
    <div className="w-full absolute font-Share text-white text-xl flex justify-center bottom-0 h-20 items-center  bg-Gray">
      <div className="flex items-center justify-between align-middle  h-full  w-full ">
        <img
          className="w-20 flex h-full"
          src={tracks[index].album.picture}
          alt=""
        />

        <div className="flex-row hidden w-6/12 md:flex justify-center overflow-hidden item-center align-middle ">
          <div className="flex w-full overflow-hidden ">
            <div className="text-white whitespace-nowrap text-2xl text-center   txt font-cuprum  ">
              {tracks[index].title} - {tracks[index].artist.name} -{" "}
              {tracks[index].album.title}&nbsp;
            </div>
            <div className="text-white whitespace-nowrap text-2xl text-center txt font-cuprum   ">
              {tracks[index].title} - {tracks[index].artist.name} -{" "}
              {tracks[index].album.title}&nbsp;
            </div>
          </div>
        </div>

        <div className="w-6/12 hidden md:flex align-middle item-center justify-center mr-3">
          <div className="w-4/5 mr-6 h-full flex align-middle item-center justify-center">
            <div className="w-4/5">
              <div className="w-full">
                <div className="endTime"></div>
                <input
                  type="range"
                  min="0"
                  className=" h-1.5 bg-white rounded slider"
                  id="myRange"
                ></input>
                <div className="endTime"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-1/2 items-center align-middle justify-center">
          <img
            className="w-5 active:scale-90 mx-4"
            onClick={handleBackward}
            src={"/controls/backward.png"}
          />
          <img
            className="w-5 active:scale-90 mx-4"
            onClick={() => setPlaying(true)}
            src={"/controls/play.png"}
          />
          <img
            className="w-5 active:scale-90 mx-4"
            onClick={() => setPlaying(false)}
            src={"/controls/pause.png"}
          />
          <img
            className="w-5 active:scale-90 mx-4"
            onClick={handleForward}
            src={"/controls/forward.png"}
          />
          <img
            className="w-5 active:scale-90 mx-4"
            onClick={handleForward}
            src={"/controls/repeat.png"}
          />
        </div>
      </div>
    </div>
  );
}
