
export type uploadType = "buffer"|"string";

export interface uploadResult {
  fname: string;
  fsize: number;
  ftype: string;
  contentString?: string;
  contentBuffer?: ArrayBuffer;
}

export function upload (type?: uploadType): Promise<uploadResult> {
  return new Promise(async (_resolve, _reject)=>{
    try {

      let result: uploadResult = {
        fname: undefined,
        fsize: 0,
        ftype: undefined,
        contentBuffer: undefined,
        contentString: undefined
      };
      
      let inputUpload = document.createElement("input") as HTMLInputElement;
      inputUpload.type = "file";
      inputUpload.onchange = ()=>{
        let file = inputUpload.files[0];
        
        result.fname = file.name;
        result.fsize = file.size;
        result.ftype = file.type;
  
        let fr = new FileReader();
        
        if (type === "string") {
          fr.readAsText(file);
          fr.onload = ()=>{
            result.contentString = fr.result as string;
  
            _resolve(result);
            return;
          };
        } else {
          fr.readAsArrayBuffer(file);
          fr.onload = ()=>{
            result.contentBuffer = fr.result as ArrayBuffer;
  
            _resolve(result);
            return;
          };
        }
      };
  
      inputUpload.click();
    } catch (ex) {
      _reject(ex);
    }
  });
}
