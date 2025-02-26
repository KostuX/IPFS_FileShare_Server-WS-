
import { CID } from "multiformats";
import { ipfs_host } from "../variable/config.js";
import FileInfo from "../utils/class/fileInfo.js"


export default async function getCidInfo(id) {

  let fInfo = new FileInfo(id)
  let cid = ""

  try {
     cid = CID.parse(id);

  let  res = await fetch(    
     `${ipfs_host}dag/get?arg=${cid}&encoding=json`, {method: "POST"}
    );
 
    try {
     let  response = await res.json();

      if (response.Links && response.Links.length > 0) {    
     
        response.Links.forEach((link, i )=> {         
       
          if(link.Name){
            
          fInfo.links.push({
            hash:link.Hash['/'],
            name:link.Name,
            size:link.Tsize,           
          })
        }
        fInfo.isFolder = fInfo.links.length >0;
          fInfo.totalSize += link.Tsize;
        });
        
      }
      else{
        let res1 = await fetch(
          `${ipfs_host}dag/stat?arg=${cid}&encoding=json&progress=false`, {method: "POST"}
        );

        let  response1 = await res1.json();       
        fInfo.totalSize = response1.TotalSize   
      }

    } catch (e) {
      console.log("Invalid json response");
    }
  } catch (e) {
    console.log("Cannot connect to a IPFS API", e);
  }

  if(fInfo) {
   
    return { ok: true, cid: cid, data: fInfo };
  } else {
    return { ok: false, cid: cid, data: "Not Found" };
  }
}
