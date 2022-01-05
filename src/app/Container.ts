import { configEnvDependencyContainer } from './config';
import DependencyContainer from '../microk/core/infrastructure/di/DependencyContainer';
import { EnvMode } from './FixBikEnv';

const container = new DependencyContainer();

const env = process.env.NODE_ENV || 'dev';

configEnvDependencyContainer(container, env as EnvMode);

export default container;
