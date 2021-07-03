import Carroussel from "../components/Carroussel/Carroussel";
import HiddenPlayer from "../components/Player/HiddenPlayer";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { trackState, ITracks } from "../State/States";

import axios from "axios";

export default function Home() {
  const [player, setPlayer] = useRecoilState(trackState);
  const { data } = useQuery("tracks", () => {
    axios({
      url: "https://api-bazify.basile.vernouillet.dev/api/v1/songs",
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpJZGF5eXkiLCJpYXQiOjE2MjUzNDc2NjMsImV4cCI6MTYyNTQzNDA2M30.GkJ5AEcXnIm0fAnw6Bi7B6C0oOkFVrYfkluGJRTg9CE",
      },
    }).then((r) => setPlayer(r.data as any));
  });

  console.log(player);
  return (
    <div className="w-full h-full flex px-16 items-center align-middle justify-center">
      <Carroussel />
      {player[0] && <HiddenPlayer />}
    </div>
  );
}
