import { NumberValueObject } from '../../../microk/common/value-object/NumberValueObject';
import InvalidBikeYearError from './InvalidBikeYearError';

export default class BikeYear extends NumberValueObject {
    protected ensureValidValue(year: number) {
        const currentYear = new Date().getFullYear();
        if (year > currentYear + 1) {
            throw new InvalidBikeYearError(year);
        }
    }
}
