import Image from "next/image";

export default function Navbar(): JSX.Element {
  return (
    <div className="w-full px-10 text-white text-2xl flex font-Share h-16 bg-Gray">
      <div className="h-full flex items-center align-middle justify-center">
        {" "}
        <span className="mx-4">Ride a</span>
        <Image width={30} height={30} src="/rocket_logo.png" />
        <span className="mx-4">Music</span>
      </div>
    </div>
  );
}
