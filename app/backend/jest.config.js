/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/test", "<rootDir>/src"],
  transform: {
    // @swc/jestを使用してテストを高速に実行する
    '^.+\\.tsx?$': ['@swc/jest', {}],
  },
   moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/src/index.ts",
    "<rootDir>/src/infrastructure/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**",
    "!**/index.ts",
    "!**/infrastructure/**",
  ],
  // coverageDirectory: 'coverage_dir',
};
