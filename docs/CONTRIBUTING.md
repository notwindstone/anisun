# Contributions Guidelines

## General

I would love to see any contributions from you! Whether it's adding a new feature, localization or even just fixing a typo.

I mainly need help with extensions: both themselves and with their loading implementation. I'm currently using [Remote Components](https://github.com/Paciolan/remote-component) as a loader, but I plan to switch to [Webpack Module Federation Runtime](https://module-federation.io/guide/basic/runtime.html) in the future. I would appreciate any help with Module Federation.

You can write your extensions in any JS framework, tho it might be better to use React to reduce the bundle size, since React is passed to the remote component as a shared dependency.

## Code Formatting

All files are formatted with `eslint` using the configuration in `eslint.config.mjs`. Ensure it is run on changed files before committing, otherwise the project will not build.

## Commits

I recommend to use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your commits (not enforced tho), a summary of which is given below.

### Naming Format

`{type}({scope})!: {subject}`

Examples:

- `refactor: reuse a graphql builder for anilist queries`
- `feat: add new locale`
- `perf!: enable react compiler`

### Elements

- **Type**: Choose from the following list. If none of the types match, use `chore`.
    - `feat`: A new feature
    - `fix`: A bug fix
    - `docs`: Documentation only changes
    - `style`: Changes that do not affect the meaning of the code
    - `refactor`: Improving code structure
    - `perf`: A code change that improves performance
    - `test`: Adding missing tests or correcting existing tests
    - `build`: Changes that affect the build system or external dependencies
    - `chore`: Other changes that don't modify src or test files
    - `revert`: Reverts a previous commit
    - `release`: Releasing a new version
    - `ci`: Changes to our CI configuration
- **Scope**: As described in Conventional Commits. Optional.
- **Breaking Change**: If you're introducing a breaking change, append `!` to the type or scope, e.g., `feat(ui)!: some breaking change`. Optional.

- **Subject**: Brief description of the change. Optional.

### Guidelines

- Use imperative mood, e.g., "feat: add feature" instead of "feat: adding feature" or "feat: added feature".
- Consider doing **atomic** commits (one feature/change at a time).
