import Image from "next/image";

export default function Error({ message }) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center align-middle ">
      <div className=" flex-col text-2xl text-center p-8 bg-Gray bg-opacity-80 rounded-lg text-white  flex items-center align-middle justify-between">
        <div className="my-8"> {message}</div>

        <Image width={100} height={100} src="/error.png" />
      </div>
    </div>
  );
}
