import { useRecoilState } from "recoil";
import { useRef, useState } from "react";
import { onSearch, trackList } from "../../../State/States";
import useScrollBox from "../../../utils/scroll";
import TrackCard from "../TrackCarroussel/TrackCard";
import Loading from "../../Loading/Loading";
import axios from "axios";
import { useQuery } from "react-query";
export default function Carroussel({ ressource }: { ressource: string }) {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const { isDragging } = useScrollBox(scrollWrapperRef);
  const [, setIsClicked] = useState<boolean>(false);
  const [search] = useRecoilState(onSearch);
  const { data, isLoading } = useQuery("tracks", () =>
    axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}${ressource}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    })
  );

  return (
    <div
      ref={scrollWrapperRef}
      className=" w-full my-2 flex-col  items-center align-middle sidebar md:border-gray-600 flex p-4 overflow-y-hidden overflow-x-auto rounded-xl "
    >
      <div className=" flex w-full  align-middle px-4 h-full">
        {!isLoading ? (
          data?.data
            .filter(
              (track: ITracks) =>
                track.title.toLowerCase().includes(search) ||
                track.album.title.toLowerCase().includes(search) ||
                track.artist.name.toLowerCase().includes(search)
            )
            .map((track: ITracks, index: number) => {
              return (
                <div className="h-full" key={index}>
                  <TrackCard
                    setIsClicked={setIsClicked}
                    track={track}
                    index={index}
                    data={data.data}
                  />
                  <div className="hidden">{isDragging}</div>
                </div>
              );
            })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
