/* eslint-disable no-console */
import Logger from '../domain/Logger';

export default class SystemLogger implements Logger {
    debug(...messages: string[]): void {
        console.debug(messages);
    }

    error(message: string | Error): void {
        console.error(message);
    }

    info(message: string): void {
        console.info(message);
    }
}
