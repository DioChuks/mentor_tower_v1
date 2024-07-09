export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 300000,
    "setupFilesAfterEnv": ["./api/__test__/jest.setup.ts"],
    collectCoverage: false,
    coverageReporters: ['text', 'html'],
    coverageDirectory: './api/coverage/'
 };