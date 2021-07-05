import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import secondToHMS from "../../utils/secontToHMS";
import {
  trackIndex,
  trackList,
  isPlaying,
  playerState,
} from "../../State/States";

export default function Playbar({ audioRef }) {
  const [tracks] = useRecoilState(trackList);
  const [index, setIndex] = useRecoilState(trackIndex);
  const [playing, setPlaying] = useRecoilState(isPlaying);
  const [player, setPlayer] = useRecoilState(playerState);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0);
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
  const positionChange = (e) => {
    setPlayer({ ...player, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  const handleVolume = (e) => {
    if (e.target.value < 3) {
      setVolume(0);
      return (audioRef.current.volume = volume);
    }
    setVolume(e.target.value / 100);
    audioRef.current.volume = volume;
  };

  useEffect(() => {
    if (player.currentTime === player.duration) {
      handleForward();
    }
  }, [player]);

  return (
    <div className="w-full absolute  overflow-x-hidden font-Share text-white text-xl flex justify-center bottom-0 h-20 items-center  bg-Gray">
      <div className="flex items-center justify-between align-middle  h-full  w-full ">
        <img
          className="w-20 flex h-full"
          src={tracks[index].album.picture || "/rocket.png"}
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

        <div className="w-6/12 hidden md:flex align-middle h-full item-center justify-center mr-3">
          <div className="w-4/5 mr-6 h-full flex align-middle item-center justify-center">
            <div className="endTime h-full text-white mx-2 flex flex-col items-center justify-center align-middle">
              {secondToHMS(player.currentTime)}
            </div>
            <div className="flex flex-col items-center justify-center align-middle">
              {" "}
              <input
                type="range"
                min="0"
                onChange={positionChange}
                max={player.duration}
                value={player.currentTime}
                className=" h-1.5 bg-white   rounded slider"
                id="myRange"
              ></input>
            </div>
            {showVolume && (
              <div className="flex flex-col items-center fixed bottom-20 right-0  h-56 justify-center align-middle">
                {" "}
                <input
                  type="range"
                  min="0"
                  onChange={handleVolume}
                  max="100"
                  className=" h-1.5 bg-white transform rotate-90 rounded slider"
                  id="myRange"
                ></input>
              </div>
            )}
            <div className="endTime flex flex-col items-center mx-2 justify-center align-middle">
              {secondToHMS(player.duration)}
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-1/2 items-center align-middle justify-end">
          <img
            className="w-5 cursor-pointer hover:scale-125 active:scale-90 mx-4"
            onClick={handleBackward}
            src={"/controls/backward.png"}
          />
          <img
            className="w-5 cursor-pointer hover:scale-125 active:scale-90 mx-4"
            onClick={() => setPlaying(true)}
            src={"/controls/play.png"}
          />
          <img
            className="w-5 cursor-pointer hover:scale-125 active:scale-90 mx-4"
            onClick={() => setPlaying(false)}
            src={"/controls/pause.png"}
          />
          <img
            className="w-5 cursor-pointer hover:scale-125 active:scale-90 mx-4"
            onClick={handleForward}
            src={"/controls/forward.png"}
          />
          <img
            className="w-5 cursor-pointer hover:scale-125 active:scale-90 mx-4"
            onClick={handleForward}
            src={"/controls/repeat.png"}
          />
          <img
            onClick={() => setShowVolume((c) => !c)}
            className="w-5 active:scale-90 mx-4 cursor-pointer"
            src="/volume.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
