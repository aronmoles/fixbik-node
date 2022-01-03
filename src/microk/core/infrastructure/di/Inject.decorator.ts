import 'reflect-metadata';
import { ConstructorParam, ContainerKey } from '../../domain/di/Container';
import { INJECT_TARGET } from './DependencyContainer';

export default function Inject(serviceKey: ContainerKey) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        const metadataKey = `${target.prototype.constructor.name}:constructor-params`;
        const constructorParams: ConstructorParam[] = Reflect.getMetadata(metadataKey, INJECT_TARGET) || [];
        constructorParams.push({
            index: parameterIndex,
            serviceKey,
        })
        Reflect.defineMetadata(metadataKey, constructorParams, INJECT_TARGET)
    }
}
