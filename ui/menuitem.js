export function menuitem(ui, opts) {
  ui.create("button", undefined, "menu-item").textContent(opts.title).on("click", opts.cb);
  return ui;
}