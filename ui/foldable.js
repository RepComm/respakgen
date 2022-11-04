export function foldable(ui, opts) {
  let f = ui.create("div", undefined, "foldable").e;
  ui.on("click", evt => {
    ui.ref(f);
    let folded = f.classList.contains("folded");

    if (folded) {
      f.classList.remove("folded");
    } else {
      f.classList.add("folded");
    }

    ui.deref();
  });
  let bar = ui.create("div", undefined, "foldable-bar").mount(f).e;
  ui.create("span", undefined, "foldable-title").textContent(opts.title).mount(bar);
  ui.create("span", undefined, "foldable-arrow").textContent(">").mount(bar);
  ui.ref(f);
  return ui;
}