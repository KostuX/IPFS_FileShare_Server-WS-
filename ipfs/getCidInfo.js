import { create, globSource, urlSource } from "kubo-rpc-client";
import { CID } from "multiformats";
import { ipfs_host } from "../variable/config.js";
import FileInfo from "../utils/class/fileInfo.js"
export default async function getCidInfo(cid) {
  const ipfs = create({ url: ipfs_host });


  let info =  new FileInfo()
  let res;
  // /api/v0/files/ls
  try {
    const parsedCID = CID.parse(cid);
   
   cid = 'QmXENoYNCXeXaogL1mFt7M6w1SD7h7mzsSKVETp7etfqnL' // folder
 // cid = 'Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z' // hello world
    res = await fetch(
     // `${ipfs_host}dag/stat?arg=${cid}&encoding=json&progress=false`, // TotalSize
     `${ipfs_host}dag/get?arg=${cid}&encoding=json&progress=false`, // get links

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
