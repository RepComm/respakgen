
import { exponent, UIBuilder } from "@roguecircuitry/htmless";
import { foldable } from "./ui/foldable.js";
import { menuitem } from "./ui/menuitem.js";

async function main() {
  let ui = new UIBuilder();

  ui.default(exponent);

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

  ui.create("div", "content").mount(document.body)
  let content = ui.e as HTMLDivElement;

  ui.create("span", undefined, "title").textContent("ResPakGen - Resource Pack Generator").mount(content);

  ui.create("div", "menu", "panel").mount(content);
  let menu = ui.e as HTMLDivElement;

  ui.create("span", undefined, "title").textContent("menu").mount(menu);

  ui.create("div", "menu-items").mount(menu);
  let menuItems = ui.e as HTMLDivElement;

  
  menuitem(ui, {title: "Import", cb: ()=>{
    console.log("Import");
  }}).mount(menuItems);

  menuitem(ui, {title: "Export", cb: ()=>{
    console.log("Export");
  }}).mount(menuItems);
  
  ui.create("div", "panels").mount(content);
  let panels = ui.e as HTMLDivElement;

  ui.create("div", "tree", "panel").mount(panels);
  let tree = ui.e as HTMLDivElement;

  ui.create("span", undefined, "title").textContent("tree").mount(tree);

  ui.create("div", "editor", "panel").mount(panels);
  let editor = ui.e as HTMLDivElement;
  ui.create("span", undefined, "title").textContent("editor").mount(editor);

  foldable(ui, { title: "Textures" }).mount(tree);
  foldable(ui, { title: "Models" }).mount(tree);
}

main();
