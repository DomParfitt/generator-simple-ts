const questions = [
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

module.exports = questions;