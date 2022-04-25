module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [
    "/node_modules",
    "/android",
    "/ios",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
  ],
  coverageReporters: [
    "lcov"
  ],
  transform: {
    "^.+\\.svg$": "jest-svg-transformer"
  },
  transformIgnorePatterns: [
    "node_modules/(?!victory-native)/"
  ],
  setupFiles: [
    "<rootDir>/jest/setup.js"
  ]
}
