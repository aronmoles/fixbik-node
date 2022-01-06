import { StringValueObject } from '../../../microk/common/value-object/StringValueObject';

export default class FixName extends StringValueObject {
    static fromString(name: string): FixName {
        return new FixName(name);
    }
}
