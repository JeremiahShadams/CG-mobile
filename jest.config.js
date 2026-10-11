/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/features'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
