export declare type pack_format = number;
export interface pack_format_map_shape {
    [key: string]: number;
}
export declare let pack_format_map: pack_format_map_shape;
export interface mcmeta {
    pack: {
        description: string;
        pack_format: pack_format;
    };
}
