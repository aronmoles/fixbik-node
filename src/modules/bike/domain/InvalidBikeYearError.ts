export default class InvalidBikeYearError extends Error {
    constructor(year: number) {
        super(`The year <${year}> is an invalid value.`);
    }
}
