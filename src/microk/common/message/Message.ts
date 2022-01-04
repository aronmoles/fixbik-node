import { MessageType } from './MessageType';
import MessageId from './MessageId';
import MessageName from './MessageName';
import MessageMeta from './MessageMeta';
import Serializable from '../Serializable';
import { PrimitivesObject } from '../PrimitiveType';

export default abstract class Message implements Serializable {
    protected constructor(
        protected _id: MessageId,
        protected _type: MessageType,
        protected _name: MessageName,
        protected _meta: MessageMeta = new MessageMeta(),
    ) {}

    get id(): MessageId {
        return this._id;
    }

    set id(value: MessageId) {
        this._id = value;
    }

    get type(): MessageType {
        return this._type;
    }

    set type(value: MessageType) {
        this._type = value;
    }

    get name(): MessageName {
        return this._name;
    }

    set name(value: MessageName) {
        this._name = value;
    }

    public get meta(): MessageMeta {
        return this._meta;
    }

    set meta(value: MessageMeta) {
        this._meta = value;
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
