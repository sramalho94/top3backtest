## GAxTOP Group 3

## TOP 2023 - Intro to Jest Testing

---

## **_Description_**

---

#### This project will serve as a very brief introduction to using Jest for unit testing, specifically for testing controllers and routes for models

### If you would like to continue building out the project, I've included a link to the Entity Relationship Diagram

[ERD](https://drive.google.com/file/d/16o9itGdFT5nF5aVu2nQWsFuYs4Q3zSR1/view?usp=sharing)

---

## Getting Started

---

- fork and clone the repo to your local machine
- run `npm i`
- run `sequelize db:create`
- run `sequelize db:create --env test`
  run `sequelize db:migrate` and `sequelize db:migrate --env test`
- tests are run using `npm test`

---

## Workflow from scratch

---

- The following workflow can be employed to build this out from scratch

  - create project directory
  - run `npm init -y`
  - run `npm install sequelize pg express cors jest nodemon`
  - run `sequelize init`
  - modify your config.json file with your chosen username, password. Change the dialect to postgres
  - run `sequelize db:create`
  - run `sequelize model:generate --name <Your Model Name Goes Here> --attributes <someattribute>:<somedatatype>,<other stuff...>`
  - add a tableName to the model and change the migration file so that it references the tableName
  - run `sequelize db:migrate`
  - you can check if you were successfully by running:

    - `psql`
    - `\c <nameOfDB>`
    - `\d <nameOfTable>`
    - confirm that what you see matches your model setup

  - create a server.js and StartServer.js
  - after configuring those files, set up routes and controllers
  - run `npm install --save-dev supertest`

  -make test directory and create test file
  -set up a test script in your package.json

  - if your tests pass you can move on to setting up Continuous Integration through Github Actions
