module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ["__mocks__"],
  moduleNameMapper: {
    "^@components(.*)": "<rootDir>/src/components/$1",
    "^@utils(.*)": "<rootDir>/src/utils/$1",
    "^@pages(.*)": "<rootDir>/src/pages/$1",
    "^@services(.*)": "<rootDir>/src/services/$1",
  },
};
