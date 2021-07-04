import React, { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { trackIndex, trackList, isPlaying } from "../../State/States";
export default function HiddenPlayer(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>();
  const [tracks] = useRecoilState(trackList);
  const [index] = useRecoilState(trackIndex);
  const [playing] = useRecoilState(isPlaying);

  useEffect(() => {
    if (!playing) {
      return audioRef.current.pause();
    }
    if (audioRef.current && playing) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [playing, index]);

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
