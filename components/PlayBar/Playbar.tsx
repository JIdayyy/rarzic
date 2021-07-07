import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import secondToHMS from "../../utils/secontToHMS";
import {
  trackIndex,
  trackList,
  isPlaying,
  playerState,
} from "../../State/States";

export default function Playbar({ audioRef }: any): JSX.Element {
  const [tracks] = useRecoilState(trackList);
  const [index, setIndex] = useRecoilState(trackIndex);
  const [playing, setPlaying] = useRecoilState(isPlaying);
  const [player, setPlayer] = useRecoilState(playerState);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0);

  const handleForward = () => {
    if (index === tracks.length - 1) {
      return setIndex(0);
    }
    setIndex((c) => c + 1);
    audioRef.current.load();
  };
  const handleBackward = () => {
    if (index === 0) {
      return setIndex(tracks.length - 1);
    }
    setIndex((c) => c - 1);
    audioRef.current.load();
  };
  const positionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, currentTime: parseInt(e.target.value) });
    audioRef.current.currentTime = e.target.value;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 3) {
      setVolume(0);
      return (audioRef.current.volume = volume);
    }
    setVolume(parseInt(e.target.value) / 100);
    audioRef.current.volume = volume;
  };

  useEffect(() => {
    if (player.currentTime === player.duration && player.currentTime !== 0) {
      return handleForward();
    }
  
  }, [player]);

  useEffect(() => {
    if (
      audioRef.current &&
      Math.floor(audioRef.current.currentTime) !== player.currentTime
    )
      audioRef.current.currenTime = player.currentTime;
    console.log(player.currentTime, Math.floor(audioRef.current.currentTime));
  }, [playing]);

  return (
    <div className="w-full absolute  overflow-x-hidden font-Share text-white text-lg flex justify-center bottom-0 h-10 items-center  bg-Gray">
      <div className="flex items-center justify-between align-middle  h-full  w-full ">
        <img
          className="w-12 flex h-full"
          src={tracks[index].album.picture || "/rocket.png"}
          alt=""
        />

        <div className="flex-row hidden w-4/12 md:flex justify-center overflow-hidden item-center align-middle ">
          <div className="flex w-full overflow-hidden ">
            <div className="text-white whitespace-nowrap text-base text-center   txt font-cuprum  ">
              {tracks[index].title} - {tracks[index].artist.name} -{" "}
              {tracks[index].album.title}&nbsp;
            </div>
            <div className="text-white whitespace-nowrap text-base text-center txt font-cuprum   ">
              {tracks[index].title} - {tracks[index].artist.name} -{" "}
              {tracks[index].album.title}&nbsp;
            </div>
          </div>
        </div>

        <div className="w-4/12  flex align-middle h-full item-center justify-center mr-3">
          <div className="w-full  h-full flex align-middle item-center justify-center">
            <div className=" hidden text-base  md:flex flex-col items-center justify-center align-middle">
              {player.currentTime === 0
                ? "00:00"
                : secondToHMS(player.currentTime)}
            </div>
            <div className="hidden mx-4 w-6/12  md:flex flex-col items-center justify-center align-middle">
              {" "}
              <input
                type="range"
                min="0"
                onChange={positionChange}
                max={player.duration}
                value={player.currentTime}
                className=" h-1   rounded slider"
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
                  className=" h-1.5 bg-white transform -rotate-90 rounded slider"
                ></input>
              </div>
            )}
            <div className="hidden text-base  md:flex flex-col items-center justify-center align-middle">
              {player.currentTime === 0
                ? "00:00"
                : secondToHMS(player.duration)}
            </div>
          </div>
        </div>
        <div className="flex w-4/12  items-center mr-10 align-middle justify-end">
          <img
            className="w-4 cursor-pointer hover:scale-125 active:scale-90 mx-4"
            onClick={handleBackward}
            src={"/controls/backward.png"}
          />
          {playing ? (
            <img
              className="w-4 cursor-pointer hover:scale-125 active:scale-90 mx-4"
              onClick={() => setPlaying(false)}
              src={"/controls/pause.png"}
            />
          ) : (
            <img
              className="w-4 cursor-pointer hover:scale-125 active:scale-90 mx-4"
              onClick={() => setPlaying(true)}
              src={"/controls/play.png"}
            />
          )}

          <img
            className="w-4 cursor-pointer hover:scale-125 active:scale-90 mx-4"
            onClick={handleForward}
            src={"/controls/forward.png"}
          />
          <img
            className="w-4 cursor-pointer hover:scale-125 active:scale-90 mx-4"
            src={"/controls/repeat.png"}
          />
          <img
            className="w-6 active:scale-90 mx-4 cursor-pointer"
            src="/controls/upload.png"
            alt=""
          />
          <img
            onClick={() => setShowVolume((c) => !c)}
            className="w-5 active:scale-90 mx-4 cursor-pointer"
            src="/controls/volume.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
