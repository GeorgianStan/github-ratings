module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFiles: ['./setupJest.ts'],
  automock: false,
  collectCoverageFrom: ['src/main.ts'],
};
