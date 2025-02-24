import { create, globSource, urlSource } from "kubo-rpc-client";
import { CID } from "multiformats";
import { ipfs_host } from "../variable/config.js";
export default async function getCidInfo(cid) {
  const ipfs = create({ url: ipfs_host });

  // folder cid QmXENoYNCXeXaogL1mFt7M6w1SD7h7mzsSKVETp7etfqnL
  // hello world Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z
  if (!cid) cid = "Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z";

  let info;
  let res;
  // /api/v0/files/ls
  try {
    const parsedCID = CID.parse(cid);

    res = await fetch(
      // `${ipfs_host}dag/stat?arg=${cid}&encoding=json&progress=false`,
      `${ipfs_host}dag/get?arg=${cid}&encoding=json&progress=false`,

      {
        method: "POST",
      }
    );
    try {
      info = await res.json();
    } catch (e) {
      console.log("Invalid json response");
    }
  } catch (e) {
    console.log("Cannot connect to a IPFS API", e);
  }

  if (info) {
    console.log(info);
    return { ok: true, cid: cid, data: info };
  } else {
    return { ok: false, cid: cid, data: "Not Found" };
  }
}
