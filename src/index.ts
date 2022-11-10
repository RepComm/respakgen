
import { exponent, UIBuilder } from "@roguecircuitry/htmless";

import { foldable, foldable_content } from "./ui/foldable.js";
import { menuitem } from "./ui/menuitem.js";
import { prompt } from "./ui/prompt.js";
import { styles } from "./ui/styles.js";
import { blobImageSize, upload, unzip } from "./utils/file.js";
import { ModelJson, MCMeta } from "./utils/mc.js";
import { TreeNode } from "./utils/pathtree.js";

enum ImportOptionsMode {
  /** */
  add,
  remove
}

enum ImportOptionsDuplicate {
  keep,
  replace,
  ask
}

interface ImportOptionsResult {
  mode: ImportOptionsMode;
  duplicate: ImportOptionsDuplicate;
  validate: boolean;
}

async function main() {

  //create an HTML builder
  let ui = new UIBuilder();

  //use flex for everything
  ui.default(exponent);

  //create styles
  styles(ui);
  ui.mount(document.head);

  //cover entire page
  ui.create("div", "content").mount(document.body)
  let content = ui.e as HTMLDivElement;

  //title of app
  ui.create("span", undefined, "title").textContent("ResPakGen - Resource Pack Generator").mount(content);

  //menu
  ui.create("div", "menu", "panel").mount(content);
  let menu = ui.e as HTMLDivElement;

  //menu title
  ui.create("span", undefined, "title").textContent("menu").mount(menu);

  //menu items container
  ui.create("div", "menu-items").mount(menu);
  let menuItems = ui.e as HTMLDivElement;

  let fileImportTree = new TreeNode<Uint8Array>();

  let textDec = new TextDecoder();

  //populate menu items

  //"import" menu item
  menuitem(ui,
    {
      title: "Import", cb: () => { //when clicked

        //create and show a prompt
        prompt<ImportOptionsResult>(ui, {
          //get some import options
          title: "Import Options",
          submitButtonText: "Import",
          cancelButtonText: "Cancel",

          //options that show in prompt and are returned in JSON serializable objects
          config: [
            {
              key: "mode",
              label: "Mode",
              default: ImportOptionsMode.add,
              type: "select",
              select: ["Add", "Erase"]
            },
            {
              key: "duplicate",
              label: "Duplicates",
              default: 0,
              type: "select",
              select: ["Keep original", "Replace with imported", "Ask"]
            },
            {
              key: "validate",
              label: "Validate",
              default: true,
              type: "boolean"
            }
          ],

          //when submitted
          cb: async (config) => {

            let zipBuffer = await upload("buffer");
            let data = await unzip(zipBuffer.contentBuffer);

            //TODO - do something
            for (let fname in data) {
              let fileData = data[fname];
              if (fileData && fileData.byteLength > 0) {
                fileImportTree.put(fname, fileData);
              }
            }

            let texDir = fileImportTree.find("assets/minecraft/textures/blocks");
            let blockTextureFnames = texDir.keys();

            let isAnimation = false;
            let frameTime = 1;

            let fancyOffset = 0;
            let fancyWait = 50;

            for (let fname of blockTextureFnames) {
              if (fname.endsWith(".mcmeta")) continue;

              isAnimation = false;

              let mcmetaBin = texDir.get(`${fname}.mcmeta`);
              if (mcmetaBin) {
                try {
                  let mcmetaStr = textDec.decode(mcmetaBin);
                  let mcmeta: MCMeta = JSON.parse(mcmetaStr);

                  isAnimation = mcmeta.animation !== undefined;
                  if (isAnimation) {
                    frameTime = mcmeta.animation.frametime || 1;
                  } else {
                    frameTime = 0;
                  }

                } catch (ex) {
                  console.warn(fname, ex);
                }
              }

              let texBin = texDir.get(fname);

              let texBlob = URL.createObjectURL(
                new Blob([texBin.buffer], { type: 'image/png' })
              );

              let texSize = await blobImageSize(texBlob);

              fancyOffset += fancyWait;

              ui.create("div", undefined, "tree-tex-item");
              
              let item = ui.e as HTMLDivElement;
              
              setTimeout(()=>{

                let prev = ui.e;
                ui.ref(item);
                ui.mount(texTree);
                
                ui.ref(prev);

                // item.scrollIntoView({behavior: "smooth"});

              }, fancyOffset);
              
              ui.create("div", undefined, "tree-tex-item-img")
              .style({
                backgroundImage: `url(${texBlob})`
              });
              let img = ui.e as HTMLDivElement;
              ui.mount(item);
              
              
              if (isAnimation) {
                let steps = Math.floor(texSize.y / texSize.x);
                
                let seconds = (frameTime * (1/20)) * steps;
                
                ui.style({
                  animationTimingFunction: `steps(${steps})`,
                  animationDuration: `${seconds}s`,
                  animationName: "spritesheet",
                  animationIterationCount: "infinite",
                  animationDirection: "normal"
                });

                img.style.setProperty("--background-y-to", `${-4 * steps}em`);
              }


              ui.create("span", undefined, "tree-tex-item-label")
                .textContent(fname)
                .mount(item);

            }


            let modelDir = fileImportTree.find("assets/minecraft/models");
            let blockModelDir = modelDir.find("block");
            let blockModelFnames = blockModelDir.keys();
            let itemModelDr = modelDir.find("item");
            let itemModelFnames = itemModelDr.keys();

            for (let fname of blockModelFnames) {
              let data = blockModelDir.get(fname);
              let str = textDec.decode(data);
              let block = JSON.parse(str) as ModelJson;
              
              
            }


          },
        });

      }
    }
  ).mount(menuItems);

  //"export" menu item
  menuitem(ui, {
    title: "Export", cb: () => {
      prompt<ImportOptionsResult>(ui, {
        title: "Export Options",
        submitButtonText: "Export",
        cb: (config) => {
          console.log("Export config", config);

        },
        config: [
          {
            key: "validate",
            label: "Validate",
            default: true,
            type: "boolean"
          },
          {
            key: "color",
            label: "Favorite color",
            default: "black",
            type: "color"
          }
        ]
      });
    }
  }).mount(menuItems);


  //editor and tree container
  ui.create("div", "panels").mount(content);
  let panels = ui.e as HTMLDivElement;

  //tree (foldable views parent)
  ui.create("div", "tree", "panel").mount(panels);
  let tree = ui.e as HTMLDivElement;

  //tree title
  ui.create("span", undefined, "title").textContent("tree").mount(tree);

  //foldable views
  foldable(ui, { title: "Textures" }).mount(tree);
  let texTree = foldable_content(ui.e);
  foldable(ui, { title: "Models" }).mount(tree);
  let modelTree = foldable_content(ui.e);
  foldable(ui, { title: "Files" }).mount(tree);
  let fileTree = foldable_content(ui.e);

  //editor
  ui.create("div", "editor", "panel").mount(panels);
  let editor = ui.e as HTMLDivElement;

  //editor title
  ui.create("span", undefined, "title").textContent("editor").mount(editor);
}

main();
