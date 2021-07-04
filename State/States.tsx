import { atom } from "recoil";

const trackList = atom({
  key: "trackListState",
  default: [] as ITracks[],
});

const trackIndex = atom({
  key: "playerState",
  default: 0,
});

const isPlaying = atom({
  key: "playState",
  default: false,
});

export { trackIndex, trackList, isPlaying };
