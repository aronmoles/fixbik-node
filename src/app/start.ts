/* eslint-disable no-console,no-undef,@typescript-eslint/no-magic-numbers */
import FixBikApp from './FixBikApp';

new FixBikApp()
    .start()
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
