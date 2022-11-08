import { exponent, UIBuilder } from "@roguecircuitry/htmless";
import { unzip } from "fflate";
import { foldable } from "./ui/foldable.js";
import { menuitem } from "./ui/menuitem.js";
import { prompt } from "./ui/prompt.js";
import { upload } from "./utils/file.js";
import { TreeNode } from "./utils/pathtree.js";
var ImportOptionsMode;

(function (ImportOptionsMode) {
  ImportOptionsMode[ImportOptionsMode["add"] = 0] = "add";
  ImportOptionsMode[ImportOptionsMode["remove"] = 1] = "remove";
})(ImportOptionsMode || (ImportOptionsMode = {}));

var ImportOptionsDuplicate;

(function (ImportOptionsDuplicate) {
  ImportOptionsDuplicate[ImportOptionsDuplicate["keep"] = 0] = "keep";
  ImportOptionsDuplicate[ImportOptionsDuplicate["replace"] = 1] = "replace";
  ImportOptionsDuplicate[ImportOptionsDuplicate["ask"] = 2] = "ask";
})(ImportOptionsDuplicate || (ImportOptionsDuplicate = {}));

async function main() {
  //create an HTML builder
  let ui = new UIBuilder(); //use flex for everything

  ui.default(exponent); //create styles

  ui.create("style", "respakgen-styles").style({
    "body": {
      backgroundColor: "#0f0f0f",
      color: "white",
      fontFamily: "'Courier New', Courier, monospace"
    },
    ".foldable": {
      overflowY: "auto",
      backgroundColor: "#1f1f1f",
      cursor: "pointer",
      maxHeight: "100vh",
      transition: "max-height 1s ease-in-out",
      flexDirection: "column"
    },
    ".folded": {
      // maxHeight: "1em",
      maxHeight: "1em"
    },
    ".foldable-bar": {
      height: "1em",
      backgroundColor: "#2f2f2f"
    },
    ".foldable-title": {
      fontFamily: "courier",
      textIndent: "1em"
    },
    ".foldable-arrow": {
      width: "1em",
      height: "1em",
      transform: "translate(0%, 20%) rotate(90deg)",
      transition: "transform 0.1s linear",
      marginTop: "-0.1em",
      marginLeft: "1em"
    },
    ".folded > div > .foldable-arrow": {
      transform: "translate(25%, -10%) rotate(0deg)"
    },
    ".prompt": {
      position: "absolute",
      width: "50%",
      height: "50%",
      left: "25%",
      top: "25%",
      flexDirection: "column",
      backgroundColor: "#333333e3",
      padding: "1em",
      borderRadius: "1em",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "black"
    },
    ".prompt-title": {
      textAlign: "center",
      marginBottom: "auto"
    },
    ".prompt > .prompt-opt:nth-child(2n+1)": {
      backgroundColor: "#2d2c2c"
    },
    ".prompt-opt": {
      maxHeight: "2em",
      padding: "0.1em",
      margin: "0.2em",
      textIndent: "1em",
      borderRadius: "2em"
    },
    ".prompt-opt-label": {
      alignSelf: "center"
    },
    ".prompt-opt-input, .prompt-opt-select": {
      backgroundColor: "transparent",
      color: "inherit",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "black",
      maxWidth: "60%",
      marginLeft: "auto",
      borderRadius: "2em",
      height: "2.5em"
    },
    ".prompt-buttons": {
      marginTop: "auto",
      //place at end of container
      maxHeight: "2em"
    },
    ".prompt-submit, .prompt-cancel": {
      backgroundColor: "#00000044",
      color: "inherit",
      maxHeight: "2em",
      borderRadius: "1em",
      marginLeft: "0.5em",
      marginRight: "0.5em"
    },
    ".prompt-submit:hover": {
      backgroundColor: "#5b795a87"
    },
    ".prompt-cancel:hover": {
      backgroundColor: "#795a5a87"
    },
    "#content": {
      flexDirection: "column"
    },
    ".panel": {
      backgroundColor: "#2d2d2d",
      borderColor: "#232222",
      borderWidth: "1px",
      borderStyle: "solid"
    },
    "#menu": {
      flex: "1",
      flexDirection: "column"
    },
    "#menu-items": {
      flexDirection: "row"
    },
    ".menu-item": {
      backgroundColor: "unset"
    },
    ".menu-item:hover": {
      backgroundColor: "#00000044"
    },
    "#panels": {
      flex: "15"
    },
    "#tree": {
      flexDirection: "column",
      flex: "1"
    },
    "#editor": {
      flex: "2"
    },
    ".title": {
      width: "100%",
      textAlign: "center",
      color: "gray",
      backgroundColor: "#282828",
      height: "1em"
    },
    ".tree-tex-item": {
      width: "33%",
      imageRendering: "crisp-edges"
    }
  }).mount(document.head); //cover entire page

  ui.create("div", "content").mount(document.body);
  let content = ui.e; //title of app

  ui.create("span", undefined, "title").textContent("ResPakGen - Resource Pack Generator").mount(content); //menu

  ui.create("div", "menu", "panel").mount(content);
  let menu = ui.e; //menu title

  ui.create("span", undefined, "title").textContent("menu").mount(menu); //menu items container

  ui.create("div", "menu-items").mount(menu);
  let menuItems = ui.e;
  let fileImportTree = new TreeNode(); //populate menu items
  //"import" menu item

  menuitem(ui, {
    title: "Import",
    cb: () => {
      //when clicked
      //create and show a prompt
      prompt(ui, {
        //get some import options
        title: "Import Options",
        submitButtonText: "Import",
        //options that show in prompt and are returned in JSON serializable objects
        config: [{
          key: "mode",
          label: "Mode",
          default: ImportOptionsMode.add,
          type: "select",
          select: ["Add", "Erase"]
        }, {
          key: "duplicate",
          label: "Duplicates",
          default: 0,
          type: "select",
          select: ["Keep original", "Replace with imported", "Ask"]
        }, {
          key: "validate",
          label: "Validate",
          default: true,
          type: "boolean"
        }],
        //when submitted
        cb: config => {
          //show a file open prompt and get the file as an array buffer
          upload("buffer").then(result => {
            //treat the file as a ZIP
            unzip(new Uint8Array(result.contentBuffer), {}, (err, data) => {
              if (err) {
                alert(`Chosen file may not be a ZIP, or has invalid/unknown formatting.. See error: "${err}"`);
                return;
              } //TODO - do something


              for (let fname in data) {
                let fileData = data[fname];

                if (fileData && fileData.byteLength > 0) {
                  fileImportTree.put(fname, fileData);
                } // ui.create("span", undefined, "tree-file-item")
                //   .textContent(path[path.length - 1])
                //   .style({ textIndent: `${path.length}em` })
                //   .mount(fileTree);

              }

              console.log(fileImportTree);
              let texDir = fileImportTree.find("assets/minecraft/textures/blocks");
              let blockTextureFnames = texDir.keys();

              for (let blockTexFname of blockTextureFnames) {
                let texBin = texDir.get(blockTexFname);
                let texBlob = URL.createObjectURL(new Blob([texBin.buffer], {
                  type: 'image/png'
                }
                /* (1) */
                ));
                ui.create("img", undefined, "tree-tex-item").mount(texTree);
                let img = ui.e;
                img.src = texBlob;
              }
            });
          });
        }
      });
    }
  }).mount(menuItems); //"export" menu item

  menuitem(ui, {
    title: "Export",
    cb: () => {
      prompt(ui, {
        title: "Export Options",
        submitButtonText: "Export",
        cb: config => {
          console.log("Export config", config);
        },
        config: [{
          key: "validate",
          label: "Validate",
          default: true,
          type: "boolean"
        }, {
          key: "color",
          label: "Favorite color",
          default: "black",
          type: "color"
        }]
      });
    }
  }).mount(menuItems); //editor and tree container

  ui.create("div", "panels").mount(content);
  let panels = ui.e; //tree (foldable views parent)

  ui.create("div", "tree", "panel").mount(panels);
  let tree = ui.e; //tree title

  ui.create("span", undefined, "title").textContent("tree").mount(tree); //foldable views

  foldable(ui, {
    title: "Textures"
  }).mount(tree);
  let texTree = ui.e;
  foldable(ui, {
    title: "Models"
  }).mount(tree);
  let modelTree = ui.e;
  foldable(ui, {
    title: "Files"
  }).mount(tree);
  let fileTree = ui.e; //editor

  ui.create("div", "editor", "panel").mount(panels);
  let editor = ui.e; //editor title

  ui.create("span", undefined, "title").textContent("editor").mount(editor);
}

main();