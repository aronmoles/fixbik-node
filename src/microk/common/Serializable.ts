import { PrimitivesObject, PrimitiveType } from './PrimitiveType';

export default interface Serializable {
    toPrimitive(): PrimitiveType | PrimitivesObject | Array<PrimitivesObject>;
}
