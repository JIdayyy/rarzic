import Link from "next/link";

export default function register() {
  return (
    <div className="w-full text-white font-bold h-screen bg-mainColor flex-col  flex items-center align-middle justify-center">
      <h1 className="my-10 text-2xl">Register</h1>
      <form className="flex flex-col ">
        <label htmlFor="">Pseudo :</label>
        <input
          className="my-2 focus:outline-none outline-none text-black px-4 py-2 rounded-md"
          type="text"
          placeholder="Enter your pseudo"
        />
        <label htmlFor="">Password :</label>
        <input
          className="my-2 focus:outline-none outline-none text-black px-4 py-2 rounded-md"
          type="text"
          placeholder="Enter your password..."
        />
        <label htmlFor="">Email :</label>
        <input
          className="my-2 focus:outline-none outline-none text-black px-4 py-2 rounded-md"
          type="text"
          placeholder="Enter your email adress ..."
        />
      </form>
      <p className="my-4 text-xs">
        Allredy have an account ? <Link href="/login">Loggin</Link>
      </p>
    </div>
  );
}
