interface IError {
  message: string;
}
interface IAlbum {
  duration: string,
  id: string;
  title: string;
  picture: string;
}
interface ITracks {
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
  playlists: Array<string>;
  s3_link: string;
  title: string;
}

interface Session {
  user: {
    firstname: string;
    email: string;
    image: string;
  };
}
