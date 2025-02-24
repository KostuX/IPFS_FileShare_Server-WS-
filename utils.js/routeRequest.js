import getCidInfo from "../ipfs/getCidInfo.js";
import getFileStream from "../ipfs/downloadFile.js";
export default async function routeRequest(req, ws) {
  let type = req.type;
  let data = req.data;

  switch (type) {
    case "GET_CID_INFO": {
      let res = await getCidInfo(data);
      ws.send(JSON.stringify({ type: "INFO", data: res }));
      break;
    }
    case "DOWNLOAD": {
      let readStream = await getFileStream(data);
      console.log(readStream);
      readStream.on("data", (chunk) => {
        console.log(chunk);
        ws.send({ type: "INFO", data: chunk });
      });
      readStream.on("end", () => {
        ws.send(JSON.stringify({ type: "DOWNLOAD_COMPLETE" }));
      });
      readStream.on("error", (err) => {
        ws.send(JSON.stringify({ type: "ERROR", data: err.message }));
      });
      break;
    }
  }
}
