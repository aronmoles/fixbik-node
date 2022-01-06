import CommandHandler from '../../../../microk/cqrs/domain/command/CommandHandler';
import BikeModifyCommand from './BikeModifyCommand';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import BikeModify from './BikeModify';

export default class BikeModifyCommandHandler extends CommandHandler<BikeModifyCommand> {
    constructor(
        @Inject(Keys.Bike.BikeModify) private readonly bikeModify: BikeModify,
    ) {
        super(BikeModifyCommand);
    }

    async handle(command: BikeModifyCommand): Promise<void> {
        await this.bikeModify.run(
            command.bikeId,
            command.bikeName,
            command.bikeBrand,
            command.bikeModel,
            command.bikeYear,
            command.authUserId,
        );
    }
}
