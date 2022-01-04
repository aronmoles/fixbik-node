import EventStore from '../../../../../microk/event/domain/EventStore';
import DomainEvent from '../../../../../microk/event/domain/DomainEvent';
import { TypeOrmRepository } from '../../../../../microk/persistence/infrastructure/typeorm/TypeOrmRepository';
import { Connection, EntitySchema } from 'typeorm';
import { EventStoreEntity } from './EventStoreEntity';
import Inject from '../../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../di/Keys';

export default class TypeOrmEventStore extends TypeOrmRepository<DomainEvent> implements EventStore {
    constructor(@Inject(Keys.App.ConnectionManager) client: Promise<Connection>) {
        super(client);
    }

    protected entitySchema(): EntitySchema<DomainEvent> {
        return EventStoreEntity;
    }

    async save(event: DomainEvent): Promise<void> {
        await super.persist(event)
    }

    async countAll(): Promise<number> {
        const repository = await this.repository()
        return repository.count();
    }
}
