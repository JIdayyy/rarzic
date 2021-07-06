import { useRecoilState } from "recoil";
import { useRef, useState } from "react";
import { onSearch, trackList } from "../../State/States";
import useScrollBox from "../../utils/scroll";
import NewCard from "../Carroussel/NewCard";
import SearchBar from "../SearchBar/SearchBar";
export default function Carroussel() {
  const scrollWrapperRef = useRef();
  const { isDragging } = useScrollBox(scrollWrapperRef);
  const [, setIsClicked] = useState<boolean>(false);
  const [tracks] = useRecoilState(trackList);
  const [search] = useRecoilState(onSearch);
  console.log(search);

  return (
    <div
      ref={scrollWrapperRef}
      className=" w-full my-2 flex-col  items-center align-middle sidebar md:border-gray-600 flex p-4 overflow-y-hidden overflow-x-auto rounded-xl "
    >
      <div className=" flex w-full  align-middle px-4 h-full">
        {tracks[0] &&
          tracks
            .filter(
              (track) =>
                track.title.toLowerCase().includes(search) ||
                track.album.title.toLowerCase().includes(search) ||
                track.artist.name.toLowerCase().includes(search)
            )
            .map((track, index) => {
              return (
                <div className="h-full" key={index}>
                  <NewCard
                    setIsClicked={setIsClicked}
                    track={track}
                    index={index}
                  />
                  <div className="hidden">{isDragging}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
