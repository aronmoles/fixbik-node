import { PrimitivesObject, PrimitiveType } from '../PrimitiveType';
import Serializable from '../Serializable';

type MessageMetaType = {
    correlationId?: string,
    replyTo?: string,
    [key: string]: PrimitiveType,
}

export default class MessageMeta implements Serializable {
    constructor(
        private readonly value: MessageMetaType = {},
    ) {}

    toPrimitive(): PrimitivesObject {
        return this.value;
    }
}
