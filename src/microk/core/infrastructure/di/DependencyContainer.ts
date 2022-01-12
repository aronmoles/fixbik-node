import { NewableClass } from '../../../common/NewableClass';
import Container, {
    ConstructorParam,
    ContainerKey,
    ContainerService,
    ContainerServiceType,
} from '../../domain/di/Container';
import { ContainerTag } from '../../domain/di/ContainerTag';
import { isNullOrUndefined } from '../../../common/isNullOrUndefined';

export const INJECT_TARGET = { name: 'Inject' };

type ServiceItem = {
    key: ContainerKey,
    type: ContainerServiceType,
    service: ContainerService | NewableClass,
    tags: ContainerTag[],
};

export default class DependencyContainer implements Container {
    private readonly services: ServiceItem[] = [];

    private readonly cache: Map<ContainerKey, ContainerService> = new Map<ContainerKey, ContainerService>();

    public addInstance(key: ContainerKey, service: ContainerService, tags?: ContainerTag[]) {
        this.services.push({
            key,
            type: 'instance',
            service,
            tags: tags || [],
        });
    }

    public addClass(key: ContainerKey, constructor: NewableClass, tags?: ContainerTag[]) {
        this.services.push({
            key,
            type: 'class',
            service: constructor,
            tags: tags || [],
        });
    }

    public get<T>(key: ContainerKey): T {
        const serviceItem = this.services.find((item) => item.key === key);
        if (!serviceItem) {
            throw new Error(`The service ${key.toString()} is not defined`);
        }
        switch (serviceItem.type) {
            case 'class': {
                const cacheService = this.cache.get(key) as T;
                if (cacheService) {
                    return cacheService;
                }
                const service = this.buildInstance<T>(serviceItem.service);
                this.cache.set(key, service);
                return service;
            }
            case 'instance': {
                return serviceItem.service as T;
            }
            default:
                throw new Error(`Not allow ${String(key)} service`);
        }
    }

    private buildInstance<S>(constructor: NewableClass): S {
        const metadataKey = `${constructor.prototype.constructor.name}:constructor-params`;
        const constructorParams: ConstructorParam[] = Reflect.getMetadata(metadataKey, INJECT_TARGET) || [];

        const args = constructorParams
            .sort((x, y) => x.index - y.index)
            .map((constructorParam) => {
                if (constructorParam.serviceKey) {
                    return this.get(constructorParam.serviceKey)
                } else if (!isNullOrUndefined(constructorParam.tag)) {
                    return this.getByTag(constructorParam.tag)
                }
                throw new Error(`Constructor ${constructor.prototype.constructor.name}(${constructorParam.index}) not has defined service key or tag`);
            })

        return Reflect.construct(constructor, args) as S;
    }

    public getByTag(tag: ContainerTag): ContainerService[] {
        return this.services
            .filter((service) => service.tags.includes(tag))
            .map((service) => this.get(service.key))
    }
}
