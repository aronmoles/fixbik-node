import CommandHandler from '../../../../microk/cqrs/domain/command/CommandHandler';
import BikeRemoveCommand from './BikeRemoveCommand';
import BikeRemove from './BikeRemove';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';

export default class BikeRemoveCommandHandler extends CommandHandler<BikeRemoveCommand> {
    constructor(
        @Inject(Keys.Bike.BikeRemove) private readonly bikeRemove: BikeRemove,
    ) {
        super(BikeRemoveCommand);
    }

    async handle(command: BikeRemoveCommand): Promise<void> {
        await this.bikeRemove.run(command.bikeId, command.authUserId)
    }
}
