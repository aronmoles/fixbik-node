import InfoQuery from '../../../../src/modules/info/application/info/InfoQuery';

export default class InfoQueryMother {
    private static create() {
        return new InfoQuery();
    }

    static random(): InfoQuery {
        return this.create();
    }
}
