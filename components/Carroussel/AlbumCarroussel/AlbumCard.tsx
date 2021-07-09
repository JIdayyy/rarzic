import Image from "next/image";
import { Dispatch } from "react";
import { useRecoilState } from "recoil";
import { trackIndex, isPlaying } from "../../../State/States";
import Link from "next/link";
interface ICard {
  index: number;

  album?: IAlbum;
  setIsClicked: Dispatch<boolean>;
}

export default function NewCard({
  index,
  album,
  setIsClicked,
}: ICard): JSX.Element {
  const background = {
    backgroundImage: `url(${album?.picture ? album?.picture : "/rocket.png"})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
  };
  const [, setIsPlaying] = useRecoilState(isPlaying);
  const [, setalbumStateIndex] = useRecoilState(trackIndex);
  const handleClick = () => {
    setalbumStateIndex(index);
    setIsPlaying(true);
  };

  return (
    <Link href={`/albums/${album?.id}`}>
      <div className="mx-4 bg-Dark_gray cursor-pointer relative hover:scale-110 shadow-searchbar  rounded-sm p-2 w-48 h-64">
        <div
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
          style={background}
          className=" rounded-md shadow-searchbar w-full h-4/6"
        ></div>
        <div className="w-40 relative text-white  flex flex-col font-Share justify-between items-center align-middle  overflow-ellipsis p-4  ">
          <span className="text-xs overflow-ellipsis  w-full">
            {album?.title}
          </span>
          <span>{""}</span>
        </div>
      </div>
    </Link>
  );
}
