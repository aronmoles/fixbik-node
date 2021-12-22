import { Dependency } from './Dependency';

export default interface DependencyMapper {
    getClassDependencies(name: string): Dependency[];
}
