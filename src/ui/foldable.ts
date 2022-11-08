
import { UIBuilder } from "@roguecircuitry/htmless";

export interface foldableOptions {
  title: string;
}

export function foldable (ui: UIBuilder, opts: foldableOptions) {  
  let f = ui.create("div", undefined, "foldable").e as HTMLDivElement;
  
  let bar = ui.create("div", undefined, "foldable-bar").mount(f).e as HTMLDivElement;
  
  ui.on("click", (evt)=>{
    ui.ref(f);
    
    let folded = f.classList.contains("folded");

    if (folded) {
      f.classList.remove("folded");
    } else {
      f.classList.add("folded");
    }
    ui.deref();
  });

  ui.create("span", undefined, "foldable-title")
  .textContent(opts.title)
  .mount(bar);

  ui.create("span", undefined, "foldable-arrow")
  .textContent(">")
  .mount(bar);

  ui.ref(f);

  return ui;
}
