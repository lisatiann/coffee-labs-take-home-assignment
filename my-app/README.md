# Coffee Labs Take Home Assignment

This agent management app is built with Typescript, React, and Material-UI. I named it Coffee Labs as a play on the company's name so that other applicants are not able to find this entry. This is a CRUD application that allows users to create agents with a name, email, and status. It also reads the last seen time and converts it to a human readible string.

## Run the Application

Running the application is simple and can be achieved through the following steps:

- `git clone` in preferred directory
- `npm install`
- `npm start `

## Implementation Details and Reasonings
1. Initially, I planned to use create-react-app (CRA) for bootstrapping the project, but I switched to Vite due to CRA's deprecation. Vite proved to be an excellent alternative because it is very easy to set up. For the purpose of this take-home assignment, I needed a quick and efficient setup, and Vite met those requirements perfectly.

2. This application includes Material-UI (MUI) components to reduce engineering time, keep styling consistent and inherit built in MUI animations. Rather than using React Table, AG Grid, or other data table libraries, I chose to use MUI because it allows me to demonstrate my knowledge in modern frameworks and core technical skills while saving time. In development for the company, I may use other frameworks that will allow me to save more time, however, for the purpose of this assignment, I thought it was best to showcase my fundamentals.

3. The agent manager adheres to engineering best practices for create, edit, and delete functionality, thus, for me, the logical next step was to create the search and filter functionality. I decided to add a search bar so that users may filter agents by name and email, as well as a filter icon that allows users to filter through status. This design was built with the consideration of future scalability. In the case that there is a requirement to add additional fields or allow users to add custom fields, there should be a means to filter with those fields as well.

4. I created an array that contains some mock data so that users can immediately interact with the edit and delete functionality.

5. For the interviewer's convenience, I chose to host the project on Vercel so that I could generate a preview link.

6. I used TypeScript, React, and localStorage to fulfill the requirements of the assignment. All the must have requirements are complete.

## Images of Core Screens
Main View
![Main View](assets/mainView.png)

Create/Edit View
![Create/Edit View](assets/createView.png)

Filter View
![Filter View](assets/filterView.png)

Delete View
![Delete View](assets/deleteView.png)

## SHORT Video Demo
![Demo](assets/demo.gif)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
