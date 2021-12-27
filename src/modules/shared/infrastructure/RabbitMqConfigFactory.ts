import Env from '@microk/core/domain/Env';
import RabbitMqConfig from '@microk/event/infrastructure/rabbit-mq/RabbitMqConfig';
import { EnvKey } from '../../../app/ProcessEnv';

export default class RabbitMqConfigFactory {
    static createConfig(env: Env<EnvKey>): RabbitMqConfig {
        return ({
            host: env.get('RABBITMQ_HOST'),
            user: env.get('RABBITMQ_USER'),
            password: env.get('RABBITMQ_PASSWORD'),
            exchange: env.get('RABBITMQ_EXCHANGE'),
            queue: env.get('RABBITMQ_QUEUE'),
        })
    }
}
