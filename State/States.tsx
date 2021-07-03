import { atom } from "recoil";

export interface ITracks {
  id: string;
  album: {
    picture: string;
    title: string;
  };
  artist: {
    name: string;
    picture: string;
  };
  duration: string;
  playlists: [string];
  s3_link: string;
  title: string;
}

const trackState = atom({
  key: "trackState",
  default: [] as ITracks[],
});

const playerState = atom({
  key: "playerState",
  default: 0,
});

export { playerState, trackState };
