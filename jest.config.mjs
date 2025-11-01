// jest.config.mjs
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(m?[tj]s|tsx)$': ['ts-jest', { useESM: true, tsconfig: './tsconfig.test.json' }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testMatch: ['**/tests/**/*.test.ts'],
  // maps ESM-style ".js" specifiers in your TS to the TS source during tests
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  verbose: false,
}
