const licenses = require('generator-license').licenses;

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

module.exports = questions;