
export interface MCMetaAnimation {
  frames?: number[];
  frametime?: number;
  interpolate?: boolean;
}

export interface MCMeta {
  animation?: MCMetaAnimation;
}

export interface ModelTextures {
  top?: string;
  bottom?: string;
  side?: string;
  cross?: string;
  rail?: string;
  texture?: string;
  all?: string;
  particle?: string;
  fire?: string;
  crop?: string;
  hook?: string;
  wood?: string;
}

export interface ModelElementFace {
  /** [xmin,ymin, xmax,ymax] */
  uv?: number[];
  texture?: string;
  cullface: string;
}

export interface ModelElementFaces {
  down: ModelElementFace;
  up: ModelElementFace;
  north: ModelElementFace;
  south: ModelElementFace;
  west: ModelElementFace;
  east: ModelElementFace;
}

export interface ModelElementRotation {
  origin: number[];
  axis: "x"|"y"|"z";
  angle: number;
}

export interface ModelElement {
  from: number[];
  to: number[];
  faces?: ModelElementFaces;
  rotation: ModelElementRotation;
}

export interface ModelJson {
  parent?: string;
  textures?: ModelTextures;
  elements?: ModelElement[];
}