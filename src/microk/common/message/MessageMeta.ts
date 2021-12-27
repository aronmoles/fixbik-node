import { PrimitivesObject, PrimitiveType } from '../PrimitiveType';
import Serializable from '../Serializable';

type MessageMetaType = {
    correlationId?: string,
    replyTo?: string,
    time?: number,
    [key: string]: PrimitiveType,
}

export default class MessageMeta implements Serializable {
    static KEYS = {
        CORRELATION_ID: 'correlationId',
        REPLY_TO: 'replyTo',
        TIME: 'time',
    };

    constructor(
        private readonly value: MessageMetaType = {},
    ) {}

    set(key: string, value: PrimitiveType): void {
        this.value[key] = value;
    }

    toPrimitive(): PrimitivesObject {
        return this.value;
    }
}
