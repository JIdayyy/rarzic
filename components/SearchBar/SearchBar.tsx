import { useRecoilState } from "recoil";
import { onSearch } from "../../State/States";

export default function SearchBar(): JSX.Element {
  const [search, setSearch] = useRecoilState(onSearch);
  return (
    <div className="bg-gray-400 flex h-8 items-center align-middle justify-center  px-2  text-sm  font-Share rounded-tl-xl  rounded-tr-xl rounded-bl-xl border-2">
      <input
        className="outline-none bg-gray-400 text-sm text-white w-full focus:outline-none"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <img className="w-6 h-6  z-50" src={"/loupe.png"} alt="" />
    </div>
  );
}
