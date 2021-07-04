import { atom } from "recoil";

const trackList = atom({
  key: "trackListState",
  default: [] as ITracks[],
});

const trackIndex = atom({
  key: "indexState",
  default: 0,
});

const isPlaying = atom({
  key: "playState",
  default: false,
});

const onSearch = atom({
  key: "searchBar",
  default: "",
});

const userState = atom({
  key: "usetState",
  default: {
    id: "",
    email: "",
    firstname: "",
    image: "",
  },
});

const playerState = atom({
  key: "playerState",
  default: {
    currentTime: 0,
    duration: 0,
  },
});

export { trackIndex, onSearch, userState, playerState, trackList, isPlaying };
