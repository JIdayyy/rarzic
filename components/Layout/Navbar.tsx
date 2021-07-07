import Image from "next/image";
import { signout } from "next-auth/client";
import { useRecoilState } from "recoil";
import Link from "next/link";
import { userState } from "../../State/States";
export default function Navbar(): JSX.Element {
  const [user] = useRecoilState(userState);
  const handleLogout = () => {
    signout();
  };
  return (
    <div className="w-full justify-between items-center align-middlen md:px-10 text-white text-base md:text-lg flex font-Share h-12 bg-Gray">
      <div className="h-full  flex items-center align-middle justify-center">
        <span className="md:flex hidden mx-4">Ride a</span>
        <Link href="/">
          <Image width={25} height={25} src="/rocket_logo.png" />
        </Link>
        <span className="mx-4">Music</span>
      </div>
      <span className="md:flex hidden items-center align-middle justify-center h-full">
        {user.firstname}{" "}
        <img className="w-10 mx-4 rounded-full " src={user.image} alt="" />
      </span>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}
