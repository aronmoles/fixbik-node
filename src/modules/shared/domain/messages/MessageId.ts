import Uuid from '../value-object/Uuid';

export default class MessageId extends Uuid {
    static create(): MessageId {
        return Uuid.create();
    }
}
