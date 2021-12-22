/* eslint-disable no-console,no-undef,@typescript-eslint/no-magic-numbers */
import App from './App';

new App()
    .start()
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
