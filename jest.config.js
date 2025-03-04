module.exports = {
  preset: "jest-preset-angular",
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text-summary", "lcov", "text"],
  collectCoverageFrom: [
    "src/app/**/*.ts",
    "!src/main.ts",
    "!src/environments/**",
    "!src/app/app.config.server.ts",
    "!src/app/app.config.ts",
    "!src/app/app.routes.ts",
    "!src/app/config.ts",
  ],
  moduleNameMapper: {
    "^@services/(.*)$": "<rootDir>/src/app/services/$1",
    "^@components/(.*)$": "<rootDir>/src/app/components/$1",
  },
};
