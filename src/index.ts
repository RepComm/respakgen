
import { exponent, UIBuilder } from "@roguecircuitry/htmless";
import { foldable } from "./ui/foldable.js";
import { menuitem } from "./ui/menuitem.js";
import { prompt } from "./ui/prompt.js";

enum ImportOptionsMode {
  /** */
  add,
  remove
}

interface ImportOptionsResult {
  mode: ImportOptionsMode;
}

async function main() {
  let ui = new UIBuilder();

  //use flex for everything
  ui.default(exponent);

  //create styles
  ui.create("style", "respakgen-styles")
  .style({
    "body": {
      backgroundColor: "#0f0f0f",
      color: "white",
      fontFamily: "'Courier New', Courier, monospace"
    },
    
    ".foldable": {
      overflowY: "auto",
      backgroundColor: "#1f1f1f",
      cursor: "pointer",
      maxHeight: "100%",
      transition: "max-height 1s ease-in-out"
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
      textIndent: "1em",
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
    ".prompt-opt-input": {
      backgroundColor: "transparent",
      color: "inherit",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "black",
      maxWidth: "60%",
      marginLeft: "auto",
      borderRadius: "2em"
    },
    ".prompt-buttons": {
      marginTop: "auto", //place at end of container
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
    }
  })
  .mount(document.head);

  //cover page
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

  //populate menu items
  menuitem(ui, {title: "Import", cb: ()=>{
    
    prompt<ImportOptionsResult>(ui, {
      title: "Import Options",
      submitButtonText: "Import",
      cb: (config)=>{

      },
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
      ]
    });

  }}).mount(menuItems);

  menuitem(ui, {title: "Export", cb: ()=>{
    prompt<ImportOptionsResult>(ui, {
      title: "Export Options",
      submitButtonText: "Export",
      cb: (config)=>{

      },
      config: [
        {
          key: "validate",
          label: "Validate",
          default: true,
          type: "boolean"
        }
      ]
    });
  }}).mount(menuItems);
  

  //editor and tree container
  ui.create("div", "panels").mount(content);
  let panels = ui.e as HTMLDivElement;

  //tree (foldable views)
  ui.create("div", "tree", "panel").mount(panels);
  let tree = ui.e as HTMLDivElement;

  //tree title
  ui.create("span", undefined, "title").textContent("tree").mount(tree);
  
  //foldable views
  foldable(ui, { title: "Textures" }).mount(tree);
  foldable(ui, { title: "Models" }).mount(tree);

  //editor
  ui.create("div", "editor", "panel").mount(panels);
  let editor = ui.e as HTMLDivElement;
  
  //editor title
  ui.create("span", undefined, "title").textContent("editor").mount(editor);
}

main();
