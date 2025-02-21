import getCidInfo from "../ipfs/getCIDInfo.js";
export default async function routeRequest(req) {
  let type = req.type;
  let data = req.data;

  switch (type) {
    case "GET_CID_INFO": {
      let res = await getCidInfo(data);
      return res;
    }
  }
}
