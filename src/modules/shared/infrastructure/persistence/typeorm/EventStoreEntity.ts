import { EntitySchema } from 'typeorm';
import DomainEvent from '../../../../../microk/event/domain/DomainEvent';
import { ValueObjectTransformer } from '../../../../../microk/persistence/infrastructure/typeorm/ValueObjectTransformer';
import MessageId from '../../../../../microk/common/message/MessageId';
import MessageName from '../../../../../microk/common/message/MessageName';
import Uuid from '../../../../../microk/common/value-object/Uuid';
import AggregateMessageOccurredOn from '../../../../../microk/common/message/AggregateMessageOccurredOn';
import MessageMeta from '../../../../../microk/common/message/MessageMeta';

export const EventStoreEntity = new EntitySchema<DomainEvent>({
    name: 'DomainEvent',
    tableName: 'event_store',
    target: DomainEvent,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: ValueObjectTransformer(MessageId),
        },
        name: {
            type: String,
            transformer: ValueObjectTransformer(MessageName),
        },
        aggregateId: {
            type: String,
            transformer: ValueObjectTransformer(Uuid),
        },
        occurredOn: {
            type: String,
            transformer: ValueObjectTransformer(AggregateMessageOccurredOn),
        },
        meta: {
            type: 'text',
            nullable: false,
            transformer: {
                to(meta: MessageMeta): string {
                    return JSON.stringify(meta.toPrimitive(), null, 2)
                },
                from(value: string): MessageMeta {
                    return new MessageMeta(value ? JSON.parse(value) : {})
                },
            },
        },
    },
});
