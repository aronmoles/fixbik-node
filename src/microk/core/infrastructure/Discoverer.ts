export default class Discoverer<T> {
    constructor(
        private readonly data: T,
    ) {
    }

    discover(): T {
        return this.data;
    }
}
