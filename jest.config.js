module.exports = {
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  testTimeout: 30000,
  globalSetup: "./test/setup.js",
  globalTeardown: "./test/teardown.js",
  moduleNameMapper: {
    "#bin/(.*)": "<rootDir>/bin/$1.js",
    "#src/(.*)": "<rootDir>/src/$1.js",
    "#sites/(.*)": "<rootDir>/src/sites/$1.js",
    "#utils/(.*)": "<rootDir>/src/utils/$1.js",
    "#config": "<rootDir>/config.json"
  }
};
