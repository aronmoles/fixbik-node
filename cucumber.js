let common = [
  'tests/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require-module tsconfig-paths/register', // Load TypeScript module
  '--require tests/app/shared/step-definitions/*.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
  '--publish-quiet',
  '--exit'
].join(' ');

module.exports = {
  default: common
};
