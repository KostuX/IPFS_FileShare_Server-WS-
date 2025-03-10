import { create, globSource, urlSource } from "kubo-rpc-client";
import { Readable } from "stream";
import { CID } from "multiformats";
import { ipfs_host } from "../variable/config.js";

const ipfs = create({ url: ipfs_host });

export default async function getFileStream(cid) {
  let resp;
  try {
   // let kubo_res = this.ipfs.get(CID.parse(cid), { archive: true }); 
    resp = await fetch(`${ipfs_host}cat?arg=${cid}`, {
      method: "POST",
    });
  } catch (e) {
    console.log("Cannot connect to a IPFS API", e);
  }
  const readableStream = resp.body;

  return Readable.from(readableStream);
}
