
import { UIBuilder } from "@roguecircuitry/htmless";

export interface foldableOptions {
  title: string;
}

export function foldable_content (f: HTMLElement): HTMLDivElement {
  let list = f.getElementsByClassName("foldable-content");
  if (!list || list.length < 1) return null;
  return list[0] as HTMLDivElement;
}

export function foldable(ui: UIBuilder, opts: foldableOptions) {
  let top = ui.create("div", undefined, "foldable").e as HTMLDivElement;

  let bar = ui.create("div", undefined, "foldable-bar").mount(top).e as HTMLDivElement;

  ui.on("click", (evt) => {
    ui.ref(top);

    let folded = top.classList.contains("folded");

    if (folded) {
      top.classList.remove("folded");
    } else {
      top.classList.add("folded");
    }
    ui.deref();
  });

  ui.create("span", undefined, "foldable-title")
    .textContent(opts.title)
    .mount(bar);

  ui.create("span", undefined, "foldable-arrow")
    .textContent(">")
    .mount(bar);

  ui.create("div", undefined, "foldable-content")
    .mount(top);

  ui.ref(top);

  return ui;
}
