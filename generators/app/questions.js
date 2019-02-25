const licenses = require('generator-license').licenses;

const questions = [
    {
        type: "input",
        name: "name",
        message: "Your project name",
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
        message: "A description of your project",
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
        type: "list",
        name: "license",
        message: "License type",
        choices: licenses,
        default: "MIT"
    },
    {
        type: "confirm",
        name: "github",
        message: "Initialise github repo"
    },
];

function optional(thisArg) {
    return [
        {
            type: "input",
            name: "ghuser",
            message: "Github repository",
            transformer: (input) => {
                if (!input) {
                    let user = thisArg.config.get("promptValues").ghuser;
                    if (!user) {
                        user = `<github-user>`;
                    }
                    return `https://github.com/${user}/${thisArg.answers.name}.git`;
                }
                return `https://github.com/${input}/${thisArg.answers.name}.git`;
            },
            store: true,
            when: thisArg.answers.github
        }
    ]
}

module.exports = questions;
module.exports.optional = optional;