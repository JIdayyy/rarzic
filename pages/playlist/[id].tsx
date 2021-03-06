import axios from "axios";
import { NextPageContext } from "next";
import { Params } from "next/dist/next-server/server/router";
import { ContextType } from "react";

export function Playlist({ data }: any) {
  console.log(data);
  return <div className=""></div>;
}

export default async function getServerSideProps(context: Params) {
  const { id } = context.params;
  console.log(`${process.env.NEXT_PUBLIC_API_URL_ALBUM}${id}`);
  const data = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL_ALBUM}`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });
  console.log(data.data);
  return {
    props: {
      data: data,
    },
  };
}
