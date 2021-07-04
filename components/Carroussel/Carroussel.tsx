import { useRecoilState } from "recoil";
import { useRef, useState } from "react";
import { trackList } from "../../State/States";
import Image from "next/image";
import useScrollBox from "../../utils/scroll";
import Card from "./Card";
export default function Carroussel() {
  const scrollWrapperRef = useRef();
  const { isDragging } = useScrollBox(scrollWrapperRef);
  const [isClicked, setIsClicked] = useState();
  const [tracks, setTracks] = useRecoilState(trackList);

  return (
    <div
      ref={scrollWrapperRef}
      className=" h-full md:h-96 w-full my-24  sidebar md:border-2 flex p-4 overflow-x-auto rounded-xl md:bg-Gray"
    >
      <div className=" flex  px-4 h-full">
        {tracks[0] &&
          tracks.map((track, index) => {
            return (
              <Card setIsClicked={setIsClicked} track={track} index={index} />
            );
          })}
      </div>
    </div>
  );
}
