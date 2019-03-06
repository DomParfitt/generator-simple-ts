const Generator = require('yeoman-generator');
const questions = require('./questions');

module.exports = class extends Generator {

    async prompting() {
        await this._askQuestions(questions(this.config));
    }

    writing() {
        // Copy templates
        this._copyTemplate('package.json');
        this._copyTemplate('README.md');
        this._copyTemplate('tsconfig.json');
        this._copyTemplate('tslint.json');
        this._copyTemplate('CHANGELOG.md', { date: new Date().toISOString().slice(0, 10) });

        if (this.answers.git) {
            this._copyTemplate('gitignore', {}, '.gitignore');
        }

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

    /**
     * Copies the template given by fileName from the template directory to the source. By default
     * uses this.answers to populate any template values.
     * @param {string} fileName the template to copy
     * @param {object} opts values to populate into the template, for overriding those provided by this.answers or providing non-prompted values
     * @param {string} targetFileName optional name for the target if it needs to be different
     */
    _copyTemplate(fileName, opts = {}, targetFileName = fileName) {
        opts = { ...this.answers, ...opts }
        this.fs.copyTpl(
            this.templatePath(fileName),
            this.destinationPath(`${this.answers.name}/${targetFileName}`),
            opts
        );
    }
};
