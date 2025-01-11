import { create, globSource, urlSource } from "kubo-rpc-client";
import { CID } from "multiformats";
import { ipfs_host } from "../variable/config.js";
export default async function getCidInfo(data) {
  const ipfs = create({ url: ipfs_host });
  let cid = "Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z";

  let info;

  let res = await fetch(
    `${ipfs_host}dag/stat?arg=${cid}&encoding=json&progress=false`,
    {
      method: "POST",
    }
  );
  info = await res.json();

  console.log(info);
}
