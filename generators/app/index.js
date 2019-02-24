const Generator = require('yeoman-generator');
const questions = require('./questions');

module.exports = class extends Generator {

    async initializing() {
        this.answers = await this.prompt(
            {
                type: "input",
                name: "name",
                message: "Your project name",
            },
        );
    }

    async prompting() {
        const answers = await this.prompt(questions);
        this.answers = { ...this.answers, ...answers };
    }

    configuring() {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(`${this.answers.name}/package.json`),
            this.answers
        );

        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath(`${this.answers.name}/README.md`),
            {
                name: this.answers.name,
                description: this.answers.description
            }
        );

        this.fs.copy(
            this.templatePath('tsconfig.json'),
            this.destinationPath(`${this.answers.name}/tsconfig.json`)
        );

        this.fs.copy(
            this.templatePath('tslint.json'),
            this.destinationPath(`${this.answers.name}/tslint.json`)
        );

        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath(`${this.answers.name}/.gitignore`)
        );
    }

    writing() {
        this.fs.write(`${this.answers.name}/src/index.ts`, "");
        this.composeWith(require.resolve('generator-license'), {
            name: this.answers.author,
            email: this.answers.email,
            website: "",
            license: this.answers.license,
            output: `${this.answers.name}/LICENSE`
        });
    }

    installing() {
        this.log("Installing dev dependencies");
        this.npmInstall([
            "typescript",
            "tslint",
            "ts-jest",
            "jest-junit",
            "jest",
            "@types/node",
            "@types/jest"
        ], { "save-dev": true }, { cwd: this.answers.name });
        this.spawnCommandSync("git", ["init"], {
            cwd: this.answers.name
        });
    }
};
