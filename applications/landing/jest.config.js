module.exports = {
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  // moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': `<rootDir>/__mocks__/fileMock.ts`,

    // Handle Module Path Aliases
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/validators/(.*)$': '<rootDir>/src/validators/$1',
    '^@/interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@/libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@/mocks/(.*)$': '<rootDir>/__mocks__/$1',
    '^@/fixtures/(.*)$': '<rootDir>/__fixtures__/$1',
    '^@/testing/(.*)$': '<rootDir>/testing/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/cypress/', '<rootDir>/__mocks__/', '<rootDir>/__fixtures__/'],
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],
  setupFilesAfterEnv: ['<rootDir>/testing/config/jest.setup.ts'],
  snapshotResolver: '<rootDir>/testing/config/jest.snapshot.ts',
  // Custom emotion serializer is used instead of default
  // It is initialized in jest.setup.ts file
  // "snapshotSerializers": ["@emotion/jest/serializer"]
};
