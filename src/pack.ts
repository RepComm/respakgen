
import * as JSZip from "jszip";

export class Pack {
  constructor () {

  }
}

export interface PackBuildResult {

}

export type pack_format = number;

export class PackBuilder {
  currentPack: Pack;

  constructor () {

  }
  start () {

  }
  build (): PackBuildResult {
    let result = {};

    let zip = new JSZip();
    zip.file("pack.mcmeta");

    return result;
  }
}
