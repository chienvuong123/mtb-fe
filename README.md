# MB-CM

## Requirements

- Node v22.13

```bash
nvm install 22.13
nvm use 22.13
```

- Yarn

```bash
npm install --global yarn
```

## Installation

- Run the following command to install the required dependencies:

```bash
yarn
```

- Set up Husky by running the following command:

```bash
yarn prepare
```

## Usage

## Environment Variables

Before running the project, make sure to set up your environment variables. Copy the `.env.example` file to a new file named `.env` and fill in the appropriate values for each variable.

### Build

To build the project for production, use the following command:

```bash
yarn build
```

### Development

To start the development server, run the following command:

```bash
yarn dev
```

### Linting

To check the linting of your code, run the following command:

```bash
yarn lint
```

To automatically fix lint issues in your code, run the following command:

```bash
yarn lint:fix
```

## Convention

### Commit

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

#### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

## Branch

- main:
- develop:
- release/{v\*}:
- feature/{feature-name}:
- fix/{hotfix-name}:
- hotfix/{hotfix-name}:

## References

- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html
