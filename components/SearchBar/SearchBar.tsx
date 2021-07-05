import { useRecoilState } from "recoil";
import { onSearch } from "../../State/States";

export default function SearchBar(): JSX.Element {
  const [search, setSearch] = useRecoilState(onSearch);
  return (
    <div className="bg-gray-400   px-4  text-xl  font-Share rounded-tl-xl flex justify-center  rounded-tr-xl rounded-bl-xl border-2">
      <input
        className="outline-none bg-gray-400 text-xl text-white w-full focus:outline-none"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <img className="w-10 h-full z-50" src={"/loupe.png"} alt="" />
    </div>
  );
}
