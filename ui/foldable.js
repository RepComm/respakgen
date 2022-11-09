export function foldable_content(f) {
  let list = f.getElementsByClassName("foldable-content");
  if (!list || list.length < 1) return null;
  return list[0];
}
export function foldable(ui, opts) {
  let top = ui.create("div", undefined, "foldable").e;
  let bar = ui.create("div", undefined, "foldable-bar").mount(top).e;
  ui.on("click", evt => {
    ui.ref(top);
    let folded = top.classList.contains("folded");

    if (folded) {
      top.classList.remove("folded");
    } else {
      top.classList.add("folded");
    }

    ui.deref();
  });
  ui.create("span", undefined, "foldable-title").textContent(opts.title).mount(bar);
  ui.create("span", undefined, "foldable-arrow").textContent(">").mount(bar);
  ui.create("div", undefined, "foldable-content").mount(top);
  ui.ref(top);
  return ui;
}