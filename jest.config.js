module.exports = {
  bail: true,
  verbose: true,
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: '__tests__/coverage',
  coveragePathIgnorePatterns: ['src/config', 'src/database'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'yml'],
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  testTimeout: 30000
}
