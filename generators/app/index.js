const Generator = require('yeoman-generator');
const questions = require('./questions');

module.exports = class extends Generator {

    async prompting() {
        this.answers = await this.prompt(
            {
                type: "input",
                name: "name",
                message: "Your project name",
            },
        );
        const answers = await this.prompt(questions);
        this.answers = { ...this.answers, ...answers };
    }

    writing() {

        // Copy templates
        this._copyTemplate('package.json', this.answers);
        this._copyTemplate('README.md',
            {
                name: this.answers.name,
                description: this.answers.description
            }
        );
        this._copyTemplate('tsconfig.json');
        this._copyTemplate('tslint.json');
        this._copyTemplate('.gitignore');

        // Write index file
        this.fs.write(`${this.answers.name}/src/index.ts`, "");

        // Generate license
        this.composeWith(require.resolve('generator-license'), {
            name: this.answers.author,
            email: this.answers.email,
            website: "",
            license: this.answers.license,
            output: `${this.answers.name}/LICENSE`
        });
    }

    installing() {
        this.npmInstall([
            "typescript",
            "tslint",
            "ts-jest",
            "jest-junit",
            "jest",
            "@types/node",
            "@types/jest"
        ], { "save-dev": true }, { cwd: this.answers.name });

        // This doesn't work atm
        this.spawnCommandSync("git", ["init"], {
            cwd: this.answers.name
        });
    }

    _copyTemplate(fileName, opts = {}) {
        this.fs.copyTpl(
            this.templatePath(fileName),
            this.destinationPath(`${this.answers.name}/${fileName}`),
            opts
        );
    }
};
