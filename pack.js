import * as JSZip from "jszip";
export class Pack {
  constructor() {}

}
export class PackBuilder {
  constructor() {}

  start() {}

  build() {
    let result = {};
    let zip = new JSZip();
    zip.file("pack.mcmeta");
    return result;
  }

}