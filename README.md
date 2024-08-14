# GOJI TEST GROCERY APP

## Used Libs

- Next JS 14
- JSON-server
- MUI
- Axios
- React Hook Form
- Zod
- Konva

## How to run

1. Clone the repo
2. Run `npm install`
3. Run `npm run json-server`
4. Run `npm run dev`

## Project Structure

- `server` folder contains the JSON-server with db.json file
- `src` folder contains the Next JS app
  - `app` folder contains the app component
  - `components` folder contains all the components
  - `context` folder contains all the context
  - `hooks` folder contains all the custom hooks
  - `services` folder contains all the services
  - `styles` folder contains all the styles
  - `types` folder contains all the types
  - `utils` folder contains all the utility functions

As this project in idea has to ready to expand, I have created a structure that
is easy to maintain and expand. Every component has its own folder with all the
necessary files.

For reusable components I have created their own folder, so they are easy to
find and use. Also, they are all customisable, to use for different purposes.
