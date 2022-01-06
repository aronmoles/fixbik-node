import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';

export interface InfoResponse extends PrimitivesObject {
    name: string,
    version: string,
    description: string,
    license: string,
    author: string,
}
