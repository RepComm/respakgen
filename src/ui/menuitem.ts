
import type { UIBuilder } from "@roguecircuitry/htmless";

export interface menuitem_options {
  title: string;
  cb: ()=>void;
}

export function menuitem (ui: UIBuilder, opts: menuitem_options) {
  ui.create("button", undefined, "menu-item").textContent(opts.title).on("click", opts.cb);
  return ui;
}
