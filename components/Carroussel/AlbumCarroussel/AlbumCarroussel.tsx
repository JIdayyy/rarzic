import { useRecoilState } from "recoil";
import { useRef, useState } from "react";
import { onSearch, trackList } from "../../../State/States";
import useScrollBox from "../../../utils/scroll";
import NewCard from "./AlbumCard";

import Loading from "../../Loading/Loading";
import axios from "axios";
import { useQuery } from "react-query";

interface IMap {
  album: object;
  index: number;
}
export default function Carroussel({ ressource }: { ressource: string }) {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const { isDragging } = useScrollBox(scrollWrapperRef);
  const [, setIsClicked] = useState<boolean>(false);
  const [search] = useRecoilState(onSearch);
  const { data, isLoading } = useQuery("albums", () =>
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
            .filter((album: IAlbum) =>
              album.title.toLowerCase().includes(search)
            )
            .map((album: IAlbum, index: number) => {
              return (
                <div className="h-full" key={index}>
                  <NewCard
                    setIsClicked={setIsClicked}
                    album={album}
                    index={index}
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
