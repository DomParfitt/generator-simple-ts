var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('simple-ts', () => {

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

    test('generates a project structure with git', () => {
        return helpers.run(path.join(__dirname, '..'))
            .withPrompts(prompts)
            .toPromise()
            .then((val) => {
                assert.file(`${prompts.name}/package.json`);
                assert.file(`${prompts.name}/.gitignore`);
                assert.file(`${prompts.name}/CHANGELOG.md`);
                assert.file(`${prompts.name}/README.md`);
                assert.file(`${prompts.name}/tsconfig.json`);
                assert.file(`${prompts.name}/tslint.json`);
                assert.file(`${prompts.name}/src/index.ts`);
            });
    });

    test('generates a project structure without git', () => {
        prompts.git = false;
        return helpers.run(path.join(__dirname, '..'))
            .withPrompts(prompts)
            .toPromise()
            .then((val) => {
                assert.file(`${prompts.name}/package.json`);
                assert.file(`${prompts.name}/CHANGELOG.md`);
                assert.file(`${prompts.name}/README.md`);
                assert.file(`${prompts.name}/tsconfig.json`);
                assert.file(`${prompts.name}/tslint.json`);
                assert.file(`${prompts.name}/src/index.ts`);

                assert.noFile(`${prompts.name}/.gitignore`);
            });
    });

});
