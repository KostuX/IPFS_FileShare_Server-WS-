import { create, globSource, urlSource } from "kubo-rpc-client";
import { CID } from "multiformats";
import { ipfs_host } from "../variable/config.js";
export default async function getCidInfo(data) {
  const ipfs = create({ url: ipfs_host });
  let cid = "Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z";

  (async () => {
    try {
      // Ensure the CID is a valid multiformats.CID object

      const parsedCID = CID.parse(cid);

      // Fetch the data
      const result = await ipfs.dag.get(parsedCID);

      console.log("CID Data:", result.value);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })();

  let info;
  let res;

  try {
    res = await fetch(
      `${ipfs_host}dag/stat?arg=${cid}&encoding=json&progress=false`,
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
    return { ok: true, cid: cid, data: info };
  } else {
    return { ok: false, cid: cid, data: "Not Found" };
  }
}
