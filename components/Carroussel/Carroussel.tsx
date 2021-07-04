import { useRecoilState } from "recoil";
import { useRef, useState } from "react";
import { trackList } from "../../State/States";

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
      className=" w-full my-4  h-full md:h-96 sidebar md:border-2 flex p-4 overflow-x-auto rounded-xl md:bg-Gray"
    >
      <div className=" flex  px-4 h-full">
        {tracks[0] &&
          tracks.map((track, index) => {
            return (
              <div key={index}>
                <Card setIsClicked={setIsClicked} track={track} index={index} />
                <div className="hidden">{isDragging}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
