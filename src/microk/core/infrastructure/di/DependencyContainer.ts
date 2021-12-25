import Container, {
    ContainerKey,
    ContainerService,
    ContainerServiceConstructor,
    ContainerServiceType,
} from '../../domain/di/Container';
import DependencyMapper from '../../domain/di/DependencyMapper';

type ServiceItem = {
    key: ContainerKey,
    type: ContainerServiceType,
    service: ContainerService | ContainerServiceConstructor
};

export default class DependencyContainer implements Container {
    private readonly services: ServiceItem[] = [];

    private readonly cache: Map<ContainerKey, ContainerService> = new Map<ContainerKey, ContainerService>();

    private dependencyMapper: DependencyMapper;

    public attachDependencyMapper(dependencyMapper: DependencyMapper): void {
        this.dependencyMapper = dependencyMapper;
    }

    public addInstance(key: ContainerKey, service: ContainerService) {
        this.services.push({
            key,
            type: 'instance',
            service,
        });
    }

    public addClass(key: ContainerKey, constructor: ContainerServiceConstructor) {
        this.services.push({
            key,
            type: 'class',
            service: constructor,
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

    private buildInstance<S>(constructor: ContainerServiceConstructor): S {
        const dependencies = this.dependencyMapper.getClassDependencies(constructor.prototype.constructor.name);
        const args = dependencies.map((dependency) => this.get(dependency));
        return Reflect.construct(constructor, args) as S;
    }
}
