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
                  '.eslintignore',
                  '.eslintrc.json',
                  '.git/',
                  '.gitignore',
                  '.prettierignore',
                  '.prettierrc.json',
                  'CHANGELOG.md',
                  'package.json',
                  'README.md',
                  'src/index.ts',
                  'tsconfig.json',
                ]);

                checkPackageJson(true);
            });
    });

    test('generates a project structure without git', () => {
        prompts.git = false;
        return helpers.run(path.join(__dirname, '..'))
            .withPrompts(prompts)
            .toPromise()
            .then((val) => {
                assertFilesExist([
                  '.eslintignore',
                  '.eslintrc.json',
                  '.prettierignore',
                  '.prettierrc.json',
                  'CHANGELOG.md',
                  'package.json',
                  'README.md',
                  'src/index.ts',
                  'tsconfig.json',
                ]);

                assertFilesDontExist([
                    '.git/',
                    '.gitignore',
                ]);

                checkPackageJson(false);
            });
    });

});

function assertFilesExist(filenames) {
    filenames.forEach((filename) => assert.file(`${prompts.name}/${filename}`));
}

function assertFilesDontExist(filenames) {
    filenames.forEach((filename) => assert.noFile(`${prompts.name}/${filename}`));
}

function checkPackageJson(withGit) {
    var json = {
      name: prompts.name,
      version: prompts.version,
      description: prompts.description,
      main: 'build/index.js',
      types: 'build/index.d.ts',
      scripts: {
        lint: "eslint . --ext .ts --max-warnings=0",
        clean: 'rm -rf build',
        build: 'tsc',
        'build:clean': 'npm run clean && npm run build',
        test: 'jest --coverage',
        prepublishOnly: 'npm run build:clean',
      },
      author: {
        name: prompts.author,
        email: prompts.email,
      },
      license: prompts.license,
      dependencies: {},
      devDependencies: {},
    };

    if (withGit) {
        json.repository = {
            "type": "git",
            "url": `${prompts.repo_type}/${prompts.repo_user}/${prompts.name}.git`
        };
    }

    assert.jsonFileContent(`${prompts.name}/package.json`, json);

}
