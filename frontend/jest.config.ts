import type {Config} from 'jest';

const config: Config = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest.polyfills.js"],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
coverageThreshold: {
global: {
branches: 75,
functions: 75,
lines: 75,
statements: 75,
},
},
};

export default config;
