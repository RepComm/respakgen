
import type { UIBuilder } from "@roguecircuitry/htmless";

export interface prompt_callback<T> {
  (config: T): void;
}

export type prompt_opt_type = "string"|"number"|"color"|"select"|"boolean";

export interface prompt_opt {
  label?: string;
  key: string;
  type: prompt_opt_type;
  default: string|number|string[]|boolean;
  select?: string[];
}

export interface prompt_options<T> {
  title: string;
  cb: prompt_callback<T>;
  submitButtonText?: string;
  cancelButtonText?: string;
  config: prompt_opt[];
}

export function prompt<T> (ui: UIBuilder, opts: prompt_options<T>) {
  ui.create("div", undefined, "prompt");
  let f = ui.e as HTMLDivElement;

  ui.create("span", undefined, "prompt-title").textContent(opts.title).mount(f);

  let keyInputMap = new Map<string, HTMLInputElement>();

  for (let opt of opts.config) {
    ui.create("div", `prompt-opt-${opt.key}`, "prompt-opt").mount(f);
    let p = ui.e as HTMLDivElement;

    ui.create("span", undefined, "prompt-opt-label").textContent(opt.label||opt.key).mount(p);

    ui.create("input", undefined, "prompt-opt-input").mount(p);
    let inp = ui.e as HTMLInputElement;

    keyInputMap.set(opt.key, inp);
  }

  ui.create("div", undefined, "prompt-buttons").mount(f);
  let buttons = ui.e as HTMLDivElement;

  ui.create("button", undefined, "prompt-cancel")
  .textContent(opts.cancelButtonText||"cancel")
  .on("click", ()=>{
    ui.ref(f); ui.unmount();
  })
  .mount(buttons);

  ui.create("button", undefined, "prompt-submit")
  .textContent(opts.submitButtonText||"submit")
  .on("click", ()=>{

    let result: T = {} as any;

    for (let [k, v] of keyInputMap) {
      result[k] = v.value;
    }

    opts.cb(result);

    ui.ref(f); ui.unmount();
  })
  .mount(buttons);

  ui.ref(f);

  ui.mount(ui._doc.body);

  return ui;
}