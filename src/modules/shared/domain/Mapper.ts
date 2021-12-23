export interface Mapper<Q, R> {
    search(query: Q): R;
}
