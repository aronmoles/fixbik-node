import { MessageType } from './MessageType';
import MessageId from './MessageId';
import MessageName from './MessageName';
import MessageMeta from './MessageMeta';
import Serializable, { PrimitivesObject } from '../Serializable';

export default abstract class Message implements Serializable {
    protected constructor(
        protected readonly id: MessageId,
        protected readonly type: MessageType,
        protected readonly _name: MessageName,
        protected readonly meta: MessageMeta = new MessageMeta(),
    ) {}

    get name(): MessageName {
        return this._name;
    }

    toPrimitive(): PrimitivesObject {
        return {
            id: this.id.value(),
            name: this._name.value(),
            type: this.type.toString(),
            meta: this.meta.toPrimitive(),
        };
    }
}
