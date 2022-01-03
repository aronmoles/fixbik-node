export default abstract class Discoverer<T> {
    protected constructor(
        private readonly data: T,
    ) {
    }

    discover(): T {
        return this.data;
    }
}
