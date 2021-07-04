// import { useQuery } from "react-query";
// import { useRecoilState } from "recoil";
// import { useState, useRef } from "react";

// import axios from "axios";

// export default function Home() {

//   const [err, setErr] = useState<IError>();
//   const audioRef = useRef<HTMLAudioElement>();

//   return (
//     <div className="w-full h-full  overflow-x-hidden flex flex-col py-10 md:py-20 px-4 md:px-16 items-center justify-start ">
//       <div className="w-full  flex md:flex-row-reverse flex-col items-start align-middle justify-between ">
//         <SearchBar />
//         <div className="bg-gray-400 px-4 my-2 md:my-0 py-2 text-xl text-white font-Share rounded-tl-xl flex justify-center  rounded-tr-xl rounded-bl-xl border-2">
//           {" "}
//           TOP 10
//         </div>
//       </div>
//       {tracks[0] && <Carroussel />}
//       {tracks[0] && <HiddenPlayer audioRef={audioRef} />}
//       <Playbar audioRef={audioRef} />
//     </div>
//   );
// }
