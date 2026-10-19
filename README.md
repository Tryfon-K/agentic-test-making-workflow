In this test I have created an agentic workflow that uses Codex and Playwright CLI to diagnose and correct failed tests.
-There are some dummy tests that use https://demo.playwright.dev/todomvc
-When a test fails, Codex is called, diagnoses the failure and proposes a solution
-If tests pass, Codex is not called. 

To experiment with this you need to have Codex installed and you need to mess with the locators in the TodoPage.ts so that the tests fail. (for example change
{ name: 'Toggle Todo' } to { name: 'Toggle Whatever' }),)
