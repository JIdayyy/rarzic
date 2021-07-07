import { ReactNode } from "react";
import Playbar from "../PlayBar/Playbar";

interface IProps {
  children: ReactNode;
}

function WithPlaybar({ children }: IProps) {
  return (
    <>
      {children}
      <Playbar />
    </>
  );
}

export default WithPlaybar;
