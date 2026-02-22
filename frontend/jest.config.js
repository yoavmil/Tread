module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/core/**/*.ts',
    '!src/app/core/**/*.spec.ts',
  ],
};
