/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html', 'text-summary', 'lcov'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.ts', '!src/typings/as.ts'],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/typings/',
        '<rootDir>/src/table/__tests__/generator.ts',
    ],
    modulePathIgnorePatterns: ['pkg/', 'resources/', 'playground/', 'cypress/'],
    testPathIgnorePatterns: [
        '<rootDir>/src/index.ts',
        '<rootDir>/src/table/__tests__/generator.ts',
    ],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.test.json',
        },
    },
};
