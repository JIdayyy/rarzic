import axios from "axios";
import { NextPageContext } from "next";
import { Params } from "next/dist/next-server/server/router";
import { ContextType } from "react";

export default function Playlist({data}: any) {
console.log(data)
  return <div className="">

  </div>;
}


export async function getServerSideProps(context: Params) {
  const { id } = context.params;
  console.log(`${process.env.NEXT_PUBLIC_API_URL_ALBUM}`)
const data = await axios({
  method : "GET",
  url: `${process.env.NEXT_PUBLIC_API_URL_ALBUM}${id}`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
  }
})
  console.log(data.data)
  return {
    props: {
      data: data.data
    },
  };
}