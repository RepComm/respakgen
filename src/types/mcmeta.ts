
export type pack_format = number;

export interface pack_format_map_shape {
  [key: string]: number;
}
export let pack_format_map: pack_format_map_shape = {
  "1.6-1.8": 1,
  "1.9-1.10": 2,
  "1.11-1.12": 3,
  "1.13-1.14": 4,
  "1.15": 5
};

export interface mcmeta {
  pack: {
    description: string;
    pack_format: pack_format;
  }
}
