module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ["__mocks__"],
  moduleNameMapper: {
    "^@components(.*)": "<rootDir>/src/components/$1",
    "^@utils(.*)": "<rootDir>/src/utils/$1",
    "^@config(.*)": "<rootDir>/src/config/$1",
    "^@assets(.*)": "<rootDir>/src/assets/$1",
    "^@pages(.*)": "<rootDir>/src/pages/$1",
    "^@services(.*)": "<rootDir>/src/services/$1",
    "^@contexts/*": "<rootDir>/src/contexts/$1",
  },
};
