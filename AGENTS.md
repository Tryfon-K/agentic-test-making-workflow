# Project guidance

This repository contains TypeScript Playwright tests. Use the project’s Playwright CLI skill to explore web pages, and use `@playwright/test` for saved automated tests.

## How to work with me

- I describe desired tests in plain English. Handle browser exploration and test design through chat; do not ask me to operate the browser CLI manually.
- Leave installations, dependencies, and project setup changes to me unless I explicitly ask you to make them.
- Before creating, editing, deleting, moving, renaming, or formatting any repository file, describe the exact proposed change and ask for my explicit approval. Do not treat a request to create or fix a test as approval to edit files. If the scope changes, ask again.
- Read-only inspection and recommendations do not need approval.

## Creating tests

- Confirm the expected user-visible outcome before writing a test.
- Explore the site with Playwright CLI, following `.agents/skills/playwright-cli/SKILL.md`.
- Use stable Playwright locators such as roles, labels, and test IDs in saved tests. Do not copy temporary CLI snapshot references such as `e8` into test code.
- Keep tests independent and use Playwright’s retrying assertions. Avoid fixed sleeps.
- Use the Page Object Model for new tests. Put page locators and UI actions in `pages/`, and keep scenario assertions in `tests/`.
- Please name variables, functions, and files descriptively. Avoid generic names like 'name', 'value', or 'test'. Use the page name and element role in locators, e.g., `loginPage.usernameInput` or `dashboardPage.logoutButton`.
- The project should be designed from the start to be scalable and to use best practices. 
- Group related tests in a feature-focused `*.spec.ts` file under a descriptive `test.describe`. Keep every test independent; do not create one file per scenario.

## Healing tests

- Reproduce the failure and inspect the error, trace, and current page before proposing a repair.
- Distinguish an application defect from an outdated test. Do not weaken an assertion merely to make a test pass.
- Explain the proposed repair, obtain approval, then run the affected test and report the result.

Keep credentials, authentication state, reports, and generated browser snapshots out of Git. Do not commit changes unless I ask.