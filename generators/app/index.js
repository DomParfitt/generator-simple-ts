const Generator = require('yeoman-generator');
const GitGenerator = require('generator-git-init/generators/app/index.js');

module.exports = class extends Generator {

    async initializing() {
        this.log("Generating Typescript project...");
        this.answers = await this.prompt(questions);
        this.destinationRoot(this.contextRoot)
        this.destinationRoot(this.answers.name);
        this.composeWith({
            Generator: GitGenerator,
            path: require.resolve('generator-git-init/generators/app')
        });
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

const questions = [
    {
        type: "input",
        name: "name",
        message: "Your project name"
    },
    {
        type: "input",
        name: "version",
        message: "Project version",
        default: "0.1.0"
    },
    {
        type: "input",
        name: "description",
        message: "A description of your project"
    },
    {
        type: "input",
        name: "author",
        message: "Project author",
        store: true,
    },
    {
        type: "input",
        name: "email",
        message: "Author's email",
        store: true,
    },
    {
        type: "input",
        name: "license",
        message: "License type",
        default: "MIT"
    },
    {
        type: "input",
        name: "repo",
        message: "Github repository",
        store: true,
    },
];
