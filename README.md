# generator-simple-ts
A Yeoman Generator for creating a simple Typescript project structure.

Generates a Typescript project with the following structure:

```
+-- <project-name>/
|   +-- .eslintignore
|   +-- .eslintrc.json
|   +-- [.git/]
|   +-- [.gitignore]
|   +-- .prettierignore
|   +-- .prettierrc.json
|   +-- CHANGELOG.md
|   +-- global-overrides.d.ts
|   +-- LICENSE
|   +-- jest.config.js
|   +-- package.json
|   +-- README.md
|   +-- src/
|   |   +-- index.ts
|   +-- tsconfig.json
```

# Usage
## Standalone
1. Install `Yeoman` globally
```bash
npm i -g yo
```
2. Install `simple-ts`
```bash
npm i -g generator-simple-ts
```
3. Run generator
```bash
yo simple-ts
```
4. Follow the [prompts](#Prompts).
   
## Composing with other Generators
TODO

# Prompts
**1. Project Name**
   
The name for the project. Will be used for the name of the top level directory holding the project.

**2. Version**

The initial version number to use for the project. Defaults to `0.1.0`

**3. Description**

The description of the project.

**4. Author**

The author of the project's name.

**5. Email**

The author's email address.

**6. License**

The type of license to use for the project. Offers a list of options.

**7. Git**

Whether to initialise a git repository in the project root.

***8. Git provider***

The Git provider for the remote repo. Currently supports: Github, Gitlab and Bitbucket.

***9. Git user***

The Git username to use in generating the repository URL. Only prompts when the option to initialise a git repository was selected. Generates a URL in the form in the `package.json`:
```
https://github.com/<github-user>/<project-name>.git
```
