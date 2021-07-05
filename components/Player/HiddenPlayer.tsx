import React, {  useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { trackIndex, trackList, isPlaying } from "../../State/States";
import { playerState } from "../../State/States";



export default function HiddenPlayer({ audioRef }: any): JSX.Element {
  const [tracks] = useRecoilState(trackList);
  const [index, setIndex] = useRecoilState(trackIndex);
  const [playing] = useRecoilState(isPlaying);
  const [player, setPlayer] = useRecoilState(playerState);
  const [sliderValue, setSliderValue] = useState<number>(0);

  useEffect(() => {
    if (!playing) {
      return audioRef!.current!.pause();
    }

    if (audioRef!.current && playing) {
      audioRef!.current.play();
    }
  }, [playing, index, player.duration]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (audioRef!.current!.currentTime > 0) {
        setPlayer({
          ...player,
          currentTime: Math.floor(audioRef!.current!.currentTime),
          duration: Math.floor(audioRef!.current!.duration),
        });
        setSliderValue(audioRef!.current!.currentTime);
      }
    }, 100);
    return function () {
      clearInterval(timer);
    };
  }, [sliderValue, audioRef]);

  return (
    <div className="z-50 absolute h-32 w-96">
      <audio
        ref={audioRef}
        className="w-96  h-10"
        src={tracks[index].s3_link}
      />
    </div>
  );
}
