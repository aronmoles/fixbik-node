import { MessageType } from './MessageType';
import MessageId from './MessageId';
import MessageName from './MessageName';
import MessageMeta from './MessageMeta';
import Serializable from '../Serializable';
import { PrimitivesObject } from '../PrimitiveType';

export default abstract class Message implements Serializable {
    protected constructor(
        protected readonly _id: MessageId,
        protected readonly _type: MessageType,
        protected readonly _name: MessageName,
        protected readonly _meta: MessageMeta = new MessageMeta(),
    ) {}

    get id(): MessageId {
        return this._id;
    }

    get type(): MessageType {
        return this._type;
    }

    get name(): MessageName {
        return this._name;
    }

    public get meta(): MessageMeta {
        return this._meta;
    }

    toPrimitive(): PrimitivesObject {
        return {
            id: this._id.value(),
            name: this._name.value(),
            type: this._type.toString(),
            meta: this._meta.toPrimitive(),
        };
    }
}
