import { Dependency } from './Dependency';

export type ClassDependency = {
    className: string,
    dependencies: Dependency[],
};
