import Env from '@microk/core/domain/Env';
import RabbitMqConfig from '@microk/event/infrastructure/rabbit-mq/RabbitMqConfig';
import { EnvKey } from '../../../app/ProcessEnv';

export default class RabbitMqConfigFactory {
    constructor(
        private readonly env: Env<EnvKey>
    ) {
    }

    config(): RabbitMqConfig {
        return ({
            host: this.env.get('RABBITMQ_HOST'),
            user: this.env.get('RABBITMQ_USER'),
            password: this.env.get('RABBITMQ_PASSWORD'),
            exchange: this.env.get('RABBITMQ_EXCHANGE'),
            queue: this.env.get('RABBITMQ_QUEUE'),
        })
    }
}
