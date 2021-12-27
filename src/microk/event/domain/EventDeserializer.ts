import { Optional } from '../../common/Optional';
import DomainEvent from './DomainEvent';

export default interface EventDeserializer {
    deserialize(eventString: string): Optional<DomainEvent>;
}
