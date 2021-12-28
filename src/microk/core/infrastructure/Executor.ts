import WrapperExecutor from '../domain/WrapperExecutor';

export default class Executor<A, R> {
    constructor(
        private readonly wrapperExecutors: WrapperExecutor<A, R>[],
    ) {
    }

    run(arg: A, next: () => Promise<R>): Promise<R> {
        const runner = (index: number) => {
            if (this.wrapperExecutors[index]) {
                return this.wrapperExecutors[index].run(arg, () => runner(index + 1))
            }
            return next();
        }

        return runner(0)
    }
}
