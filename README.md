# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-  [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
-  [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
   globalIgnores(["dist"]),
   {
      files: ["**/*.{ts,tsx}"],
      extends: [
         // Other configs...

         // Remove tseslint.configs.recommended and replace with this
         tseslint.configs.recommendedTypeChecked,
         // Alternatively, use this for stricter rules
         tseslint.configs.strictTypeChecked,
         // Optionally, add this for stylistic rules
         tseslint.configs.stylisticTypeChecked,

         // Other configs...
      ],
      languageOptions: {
         parserOptions: {
            project: ["./tsconfig.node.json", "./tsconfig.app.json"],
            tsconfigRootDir: import.meta.dirname,
         },
         // other options...
      },
   },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
   globalIgnores(["dist"]),
   {
      files: ["**/*.{ts,tsx}"],
      extends: [
         // Other configs...
         // Enable lint rules for React
         reactX.configs["recommended-typescript"],
         // Enable lint rules for React DOM
         reactDom.configs.recommended,
      ],
      languageOptions: {
         parserOptions: {
            project: ["./tsconfig.node.json", "./tsconfig.app.json"],
            tsconfigRootDir: import.meta.dirname,
         },
         // other options...
      },
   },
]);
```

Border Countries Feature

Problem:
Initially, border countries didn’t display because the app was trying to get their names from a context that no longer existed. There were also issues with the API URL and conditional hooks in TypeScript.

Solution:

After fetching the main country data, check if it has borders.

Build a correct API URL using the border codes:

https://restcountries.com/v3.1/alpha?codes=BRA,ARG&fields=name,cca3

Use a custom useFetch hook to fetch border countries unconditionally (pass null if no borders).

Render the border countries safely using .map() and show their full names.

Added CSS styling to display border countries as buttons with spacing.

Result:

All border countries are now displayed as clickable buttons.

Each button navigates to the details page of the selected border country.
