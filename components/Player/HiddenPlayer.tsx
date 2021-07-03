import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playerState, trackState } from "../../State/States";
export default function HiddenPlayer(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>();
  const [tracks, setTracks] = useRecoilState(trackState);
  const [player, setPlayer] = useRecoilState(playerState);

  console.log(tracks[0]);

  useEffect(() => {
    audioRef.current.play();
  }, [player]);
  useEffect(() => {
    audioRef.current.pause();
  }, []);

  return (
    <div className="z-50 absolute h-32 w-96">
      <button
        className="text-white"
        onClick={() => {
          audioRef.current.play();
        }}
      >
        PLAY
      </button>
      <button
        className="text-white"
        onClick={() => {
          audioRef.current.play();
        }}
      >
        FORWARD
      </button>
      <button
        className="text-white"
        onClick={() => {
          audioRef.current.pause();
          setPlayer((c) => c + 1);
        }}
      >
        BACKWARD
      </button>
      <audio
        ref={audioRef}
        controls
        className="w-96  h-10"
        src={tracks[player].s3_link}
      />
    </div>
  );
}
