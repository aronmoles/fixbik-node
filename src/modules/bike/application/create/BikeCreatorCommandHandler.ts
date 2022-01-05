import CommandHandler from '../../../../microk/cqrs/domain/command/CommandHandler';
import BikeCreatorCommand from './BikeCreatorCommand';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import BikeCreator from './BikeCreator';

export default class BikeCreatorCommandHandler extends CommandHandler<BikeCreatorCommand> {
    constructor(
        @Inject(Keys.Bike.BikeCreator) private readonly bikeCreator: BikeCreator,
    ) {
        super(BikeCreatorCommand);
    }

    async handle({ bikeBrand, bikeId, bikeModel, bikeName, bikeYear, userId }: BikeCreatorCommand): Promise<void> {
        await this.bikeCreator.run(bikeId, userId, bikeName, bikeBrand, bikeModel, bikeYear,);
    }
}
