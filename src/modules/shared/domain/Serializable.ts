import { PrimitiveType } from './PrimitiveType';

export type PrimitivesObject = {[key: string]: PrimitiveType | PrimitivesObject}

export default interface Serializable {
    toJSON(): PrimitiveType | PrimitivesObject | Array<PrimitivesObject>;
}
