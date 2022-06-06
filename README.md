# Automation Project Demo

This repo contains UI automation framework for the [automationexercise](https://www.automationexercise.com/) using the `Playwright` and `JavaScript`. 
Playwright docs: [playwright.dev](https://playwright.dev/)

## Required 

This project uses `Node.js` library and `yarn` as a package manager, so I recommend install the latest version of the Node.js.
Playwright Test requiers `Node.js` 12+ 

## Build project

In the first touch with this project, you need only install all dependencies by `yarn install`.

### Scripts

Main script like: **tests**, is defined in `package.json` in section scripts and can be run by adding `yarn` before name of script, for example:

`yarn tests:ch`

You can also run particular test file, for example:

`yarn run env-cmd -f dev.env npx playwright test .\e2e\cart.spec.js  --project=chromium`

### Allure

To run e2e tests with allure use:

`yarn tests:allure`

To generate report use:

`yarn allure:generate`

To open report use:

`yarn allure:open`
