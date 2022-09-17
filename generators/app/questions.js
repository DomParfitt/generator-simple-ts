const licenses = require('generator-license').licenses;

const gitProviders = [
  { name: 'Github', value: 'https://github.com' },
  { name: 'Gitlab', value: 'https://gitlab.com' },
  { name: 'Bitbucket', value: 'https://bitbucket.org' },
];

function questions(config, { author, email }) {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'Your project name',
      validate: (input, answers, opts) => /^[a-zA-Z0-9-_]+$/.test(input),
    },
    {
      type: 'input',
      name: 'version',
      message: 'Project version',
      default: '0.1.0',
      validate: (input, answers, opts) => /^[0-9]+.[0-9]+.[0-9]+$/.test(input),
    },
    {
      type: 'input',
      name: 'description',
      message: 'A description of your project',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Project author',
      default: author,
    },
    {
      type: 'input',
      name: 'email',
      message: "Author's email",
      default: email,
    },
    {
      type: 'list',
      name: 'license',
      message: 'License type',
      choices: licenses,
      default: 'MIT',
    },
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialise git repo',
    },
    {
      type: 'list',
      name: 'repo_type',
      message: 'Git repository type',
      choices: gitProviders,
      default: gitProviders[0],
      store: true,
      when: (answers) => answers.git,
    },
    {
      type: 'input',
      name: 'repo_user',
      message: 'Git repository user',
      transformer: (input, answers) => {
        if (!input) {
          let user = `<git-repo-user>`;
          if (config.get('promptValues')) {
            user = config.get('promptValues').repo_user;
          }
          return `${answers.repo_type}/${user}/${answers.name}.git`;
        }
        return `${input} (${answers.repo_type}/${input}/${answers.name}.git)`;
      },
      store: true,
      when: (answers) => answers.git,
    },
  ];
}

module.exports = questions;
