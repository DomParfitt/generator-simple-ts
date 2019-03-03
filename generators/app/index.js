const Generator = require('yeoman-generator');
const questions = require('./questions');

module.exports = class extends Generator {

    async prompting() {
        // Ask standard questions
        await this._askQuestions(questions(this.config));
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
        this._copyTemplate('CHANGELOG.md',
            {
                version: this.answers.version,
                date: new Date().toISOString().slice(0, 10),
            }
        );

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
    }

    end() {
        if (this.answers.git) {
            this.spawnCommandSync("git", ["init"], { cwd: this.answers.name });
        }
    }


    async _askQuestions(questions) {
        const answers = await this.prompt(questions);
        if (!this.answers) {
            this.answers = answers;
        } else {
            this.answers = { ...this.answers, ...answers };
        }
    }

    _copyTemplate(fileName, opts = {}) {
        this.fs.copyTpl(
            this.templatePath(fileName),
            this.destinationPath(`${this.answers.name}/${fileName}`),
            opts
        );
    }
};
