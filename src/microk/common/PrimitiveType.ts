export type PrimitiveType = string | number | boolean | Date;

export type PrimitivesObject = {[key: string]: PrimitiveType | PrimitivesObject}
