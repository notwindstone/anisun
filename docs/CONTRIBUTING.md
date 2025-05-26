# Contributions Guidelines

## General

I would love to see any contributions from you! Whether it's adding a new feature, localization or even just fixing a typo.

## Code Formatting

All files are formatted with `eslint` using the configuration in `eslint.config.mjs`. Ensure it is run on changed files before committing, otherwise the project will not build.

## Commits

I recommend to use these guidelines for your commits (not enforced tho).

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
- Avoid ending with a period.
- Consider doing **atomic** commits (one feature/change at a time).