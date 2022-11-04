export declare class Pack {
    constructor();
}
export interface PackBuildResult {
}
export declare type pack_format = number;
export declare class PackBuilder {
    currentPack: Pack;
    constructor();
    start(): void;
    build(): PackBuildResult;
}
