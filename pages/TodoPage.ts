import type { Locator, Page } from '@playwright/test';

export class TodoPage {
  readonly newTodo: Locator;
  readonly todoItems: Locator;

  constructor(private readonly page: Page) {
    this.newTodo = page.getByRole('textbox', {
      name: 'What needs to be done?',
    });
    this.todoItems = page.getByRole('listitem').filter({
      has: page.getByRole('checkbox', { name: 'Toggle Todo' }),
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  async addTodo(name: string): Promise<void> {
    await this.newTodo.fill(name);
    await this.newTodo.press('Enter');
  }

  todoItemByName(todoMessageName: string): Locator {
    return this.todoItems.filter({
      has: this.page.getByText(todoMessageName, { exact: true }),
    });
  }

  async deleteTodo(todoMessageName: string): Promise<void> {
    const todoItem = this.todoItemByName(todoMessageName);
    await todoItem.hover();
    await todoItem.getByRole('button', { name: 'Delete' }).click();
  }
}
