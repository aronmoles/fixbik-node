import { MotherCreator } from './MotherCreator';

export class TokenMother {
    static random(): string {
        return MotherCreator.random().datatype.hexaDecimal(50);
    }
}
