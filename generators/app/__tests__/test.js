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

            });
    });

});

function assertFilesExist(filenames) {
    filenames.forEach((filename) => assert.file(`${prompts.name}/${filename}`));
}

function assertFilesDontExist(filenames) {
    filenames.forEach((filename) => assert.noFile(`${prompts.name}/${filename}`));
}
