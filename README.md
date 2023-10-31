
<h1 align="center">
  Remix JS Template by Gridman
</h1>

<p align="center">
  Template for RemixJS-Express app server with TypeScript, including: Unit and end-to-end tests and linting.
  <br />
  <a href="https://github.com/ssbeater/gridman-remixjs-template">GitHub Repository</a>
</p>

## Using this Remix template

1. Create your project based on this template:
   - Clone the template, go to GitHub repository and click "Use this template" button to create your newly repository
   - You can use [degit](https://github.com/Rich-Harris/degit) for create a local project:
     ```bash
     npx degit ssbeater/gridman-remixjs-template#main my-app
     ```
2. Update your project meta-information:
   -  Update the `package.json`:
   - Update `name`, `author` and `license` properties
   - Change the title in `app/root.tsx`
   - Replace the favicon in the `public` directory
3. Runnig app:
   - `cd my-app`: Move to your project root directory
   - `npm install`: Install all the project dependencies
   - `npm start`: Start the development (using [localhost:3000](http://localhost:3000) by default)

## Testing

### Unit tests

`npm run test`: Run unit tests with Jest and React Testing Library

### End-to-end tests

1. `npm start`: Start the development server on [localhost:3000](http://localhost:3000)
2. Run end-to-end tests with Cypress choosing one of the following options:
  - `npm run cy:open`: Open Cypress in dev mode
  - `npm run cy:run`: Execute Cypress in CLI

## Linting

- `npm run lint`: Run linter
- `npm run lint:fix`: Fix lint issues

## Tech Stack

- [Remix JS](https://remix.run/)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org) and [Prettier](https://prettier.io) by [CodelyTV Eslint Config](https://github.com/CodelyTV/eslint-config-codely)
- [Jest](https://jestjs.io) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) -> Tests
- [Cypress](https://www.cypress.io) and [Testing Library](https://testing-library.com/docs/cypress-testing-library) -> E2E tests
