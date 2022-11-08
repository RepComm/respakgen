export function upload(type) {
  return new Promise(async (_resolve, _reject) => {
    try {
      let result = {
        fname: undefined,
        fsize: 0,
        ftype: undefined,
        contentBuffer: undefined,
        contentString: undefined
      };
      let inputUpload = document.createElement("input");
      inputUpload.type = "file";

      inputUpload.onchange = () => {
        let file = inputUpload.files[0];
        result.fname = file.name;
        result.fsize = file.size;
        result.ftype = file.type;
        let fr = new FileReader();

        if (type === "string") {
          fr.readAsText(file);

          fr.onload = () => {
            result.contentString = fr.result;

            _resolve(result);

            return;
          };
        } else {
          fr.readAsArrayBuffer(file);

          fr.onload = () => {
            result.contentBuffer = fr.result;

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