export default class FileInfo{
    cid = '';
    totalSize = 0;
    links = [];
    isFolder = false;

    constructor(cid){
        this.cid = cid;
    }

    setLinks(links){
        this.links = links
    }

    getLinks(){
        return this.links
    }
}