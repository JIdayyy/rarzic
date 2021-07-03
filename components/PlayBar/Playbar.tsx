import { useRecoilState } from "recoil";
import { playerState } from "../../State/States";

export default function Playbar() {
  const [player, setPlayer] = useRecoilState(playerState);
  return <div></div>;
}
