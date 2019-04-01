module.exports = {
    moduleFileExtensions: [
        'ts', 'tsx', 'js', 'json', 'node', 'png'
    ],
    moduleDirectories: [
        'node_modules', 'src'
    ],
    testRegex: '.*\\.test\\.tsx?$',
    setupFiles: [
        '<rootDir>/__tests__/setup.ts'
    ],
    testURL: 'http://127.0.0.1',
    transform: {
        '.+\\.(ts|tsx)$': '<rootDir>/__tests__/preprocessor-typescript.js',
        '.+\\.(png|svg|jpg|webp|gif)$': '<rootDir>/__tests__/preprocessor-filepath.js',
        '.+\\.js$': 'babel-jest',
        '.+\\.(css|pcss)$': 'jest-css-modules-transform'
    }
};
