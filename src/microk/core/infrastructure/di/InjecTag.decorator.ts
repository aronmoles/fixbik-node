import 'reflect-metadata';
import { ConstructorParam } from '../../domain/di/Container';
import { ContainerTag } from '../../domain/di/ContainerTag';
import { INJECT_TARGET } from './DependencyContainer';

export default function InjectTag(tag: ContainerTag) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        const metadataKey = `${target.prototype.constructor.name}:constructor-params`;
        const constructorParams: ConstructorParam[] = Reflect.getMetadata(metadataKey, INJECT_TARGET) || [];
        constructorParams.push({
            index: parameterIndex,
            tag,
        })
        Reflect.defineMetadata(metadataKey, constructorParams, INJECT_TARGET)
    }
}
