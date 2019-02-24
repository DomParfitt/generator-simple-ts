const Generator = require('yeoman-generator');
const GitGenerator = require('generator-git-init/generators/app/index.js');
const questions = require('./questions');

module.exports = class extends Generator {

    async initializing() {
        this.log("Generating Typescript project...");
        this.answers = await this.prompt(questions);
        this.destinationRoot(this.contextRoot)
        this.destinationRoot(this.answers.name);

        // this.composeWith(require.resolve('generator-license'), {
        //     name: this.answers.author,
        //     email: this.answers.email,
        //     website: "",
        //     license: this.answers.license,
        //     output: this.destinationRoot(),
        // });
    }

    configuring() {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            this.answers
        );

        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            {
                name: this.answers.name,
                description: this.answers.description
            }
        );

        this.fs.copy(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json')
        );

        this.fs.copy(
            this.templatePath('tslint.json'),
            this.destinationPath('tslint.json')
        );

        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore')
        );
    }

    writing() {
        this.fs.write("src/index.ts", "");
        this.spawnCommand("git", ["init"]);
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
        ], { "save-dev": true });
    }
};
