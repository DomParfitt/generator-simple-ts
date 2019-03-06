var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

const prompts = {
    name: 'foo',
    version: '0.1.0',
    description: 'test',
    author: 'me',
    email: 'me@example.com',
    license: 'MIT',
    git: true,
    repo_type: 'Github',
    repo_user: 'MyGit'
};

describe('simple-ts', () => {

    test('generates a project structure with git', () => {
        return helpers.run(path.join(__dirname, '..'))
            .withPrompts(prompts)
            .toPromise()
            .then((val) => {
                assertFilesExist([
                    'package.json',
                    '.git/',
                    '.gitignore',
                    'CHANGELOG.md',
                    'README.md',
                    'tsconfig.json',
                    'tslint.json',
                    'src/index.ts'
                ]);

                assert.jsonFileContent(`${prompts.name}/package.json`, packageJson(true));
            });
    });

    test('generates a project structure without git', () => {
        prompts.git = false;
        return helpers.run(path.join(__dirname, '..'))
            .withPrompts(prompts)
            .toPromise()
            .then((val) => {
                assertFilesExist([
                    'package.json',
                    'CHANGELOG.md',
                    'README.md',
                    'tsconfig.json',
                    'tslint.json',
                    'src/index.ts'
                ]);

                assertFilesDontExist([
                    '.git/',
                    '.gitignore',
                ]);

                assert.jsonFileContent(`${prompts.name}/package.json`, packageJson(false));

            });
    });

});

function assertFilesExist(filenames) {
    filenames.forEach((filename) => assert.file(`${prompts.name}/${filename}`));
}

function assertFilesDontExist(filenames) {
    filenames.forEach((filename) => assert.noFile(`${prompts.name}/${filename}`));
}

function packageJson(git) {
    var json = {
        "name": prompts.name,
        "version": prompts.version,
        "description": prompts.description,
        "keywords": [
            "aws",
            "key-rotation"
        ],
        "main": "lib/index.js",
        "types": "lib/index.d.ts",
        "scripts": {
            "lint": "tslint -c tslint.json 'src/**/*.ts'",
            "clean": "rm -rf lib",
            "build": "npm run lint && tsc",
            "clean-build": "npm run clean && npm run build",
            "test": "jest --coverage",
            "prepublishOnly": "npm run clean-build"
        },
        "author": {
            "name": prompts.author,
            "email": prompts.email
        },
        "license": prompts.license,
        "dependencies": {},
        "devDependencies": {},
        "jest": {
            "roots": [
                "<rootDir>/src"
            ],
            "transform": {
                "^.+\\.tsx?$": "ts-jest"
            },
            "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
            "moduleFileExtensions": [
                "ts",
                "tsx",
                "js",
                "jsx",
                "json",
                "node"
            ],
            "coverageDirectory": "test-results/jest/",
            "collectCoverage": true,
            "collectCoverageFrom": [
                "**/src/**"
            ],
            "reporters": [
                "default",
                "jest-junit"
            ]
        },
        "jest-junit": {
            "outputDirectory": "test-results/jest",
            "outputName": "./js-test-results.xml",
            "usePathForSuiteName": "true"
        }
    };

    if (git) {
        json.repository = {
            "type": "git",
            "url": `${prompts.repo_type}/${prompts.repo_user}/${prompts.name}.git`
        };
    }

    return json;
}