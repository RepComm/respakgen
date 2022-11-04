export function prompt(ui, opts) {
  ui.create("div", undefined, "prompt");
  let f = ui.e;
  ui.create("span", undefined, "prompt-title").textContent(opts.title).mount(f);
  let keyInputMap = new Map();

  for (let opt of opts.config) {
    ui.create("div", `prompt-opt-${opt.key}`, "prompt-opt").mount(f);
    let p = ui.e;
    ui.create("span", undefined, "prompt-opt-label").textContent(opt.label || opt.key).mount(p);
    ui.create("input", undefined, "prompt-opt-input").mount(p);
    let inp = ui.e;
    keyInputMap.set(opt.key, inp);
  }

  ui.create("div", undefined, "prompt-buttons").mount(f);
  let buttons = ui.e;
  ui.create("button", undefined, "prompt-cancel").textContent(opts.cancelButtonText || "cancel").on("click", () => {
    ui.ref(f);
    ui.unmount();
  }).mount(buttons);
  ui.create("button", undefined, "prompt-submit").textContent(opts.submitButtonText || "submit").on("click", () => {
    let result = {};

    for (let [k, v] of keyInputMap) {
      result[k] = v.value;
    }

    opts.cb(result);
    ui.ref(f);
    ui.unmount();
  }).mount(buttons);
  ui.ref(f);
  ui.mount(ui._doc.body);
  return ui;
}