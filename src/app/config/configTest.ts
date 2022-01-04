import { Keys } from '../../modules/shared/infrastructure/di/Keys';
import { TypeOrmEnvironmentArranger } from '../../microk/tests/infrastructure/typeorm/TypeOrmEnvironmentArranger';
import TypeOrmEnvironmentFixtures from '../../microk/tests/infrastructure/typeorm/TypeOrmEnvironmentFixtures';
import Container from '../../microk/core/domain/di/Container';

export const configTest = (container: Container) => {
    container.addClass(Keys.Test.EnvironmentArranger, TypeOrmEnvironmentArranger)
    container.addClass(Keys.Test.EnvironmentFixtures, TypeOrmEnvironmentFixtures)
}
