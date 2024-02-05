# Type of runners:

1. head less- npx playwright test PATH
2. Headed- npx playwright test --headed PATH
3. Playwright UI Screen: npx playwright test --ui PATH ----- Can filter and run any test case
4. Playwright Trace - npx playwright test --headed --trace on PATH ----- Instead of using trace on , we can enable this from playwright config using a key "trace"

# ESLint — For code quality

npm install eslint --save-dev

![Alt text](image-1.png)

For the recommended linter use the extend object and for a specifics ones use rule
The eslint file looks like: ![Alt text](image-2.png)

Use playwright recommended plugin for recommended rules: [extends:"plugin:playwright/recommended"]
Recommeded Rules :
https://eslint.org/docs/latest/rules
https://typescript-eslint.io/rules/?=recommended
https://www.npmjs.com/package/eslint-plugin-playwright

# Prettier — For advance code formatting i.e. file based
