export default interface WrapperExecutor<D, R> {
    run(data: D, next: () => Promise<R>): Promise<R>;
}
