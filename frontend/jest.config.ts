import type {Config} from 'jest';


module.exports = {
    // Other Jest configurations...
    moduleNameMapper: {
        '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
};

const config: Config = {
    testEnvironment: "jsdom",
    setupFiles: ["<rootDir>/jest.polyfills.js" , "<rootDir>/jest.setup.js"],
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
