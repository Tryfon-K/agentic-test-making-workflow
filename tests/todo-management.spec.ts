import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('todoMVC homepage tests', () => {
  test('adds three todos in order', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const todoMessageNames = [
      'do this thing',
      'then do this other thing',
      'then do that',
    ];

    await todoPage.goto();

    for (const name of todoMessageNames) {
      await todoPage.addTodo(name);
    }

    await expect(todoPage.todoItems).toHaveCount(3);
    await expect(todoPage.todoItems).toContainText(todoMessageNames);
  });

  test('deletes two todos one at a time', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const firstTodoMessage = 'buy milk';
    const secondTodoMessage = 'walk dog';

    await todoPage.goto();
    await todoPage.addTodo(firstTodoMessage);
    await todoPage.addTodo(secondTodoMessage);

    await expect(todoPage.todoItems).toHaveCount(2);

    await todoPage.deleteTodo(firstTodoMessage);
    await expect(todoPage.todoItemByName(firstTodoMessage)).toHaveCount(0);
    await expect(todoPage.todoItemByName(secondTodoMessage)).toHaveCount(1);

    await todoPage.deleteTodo(secondTodoMessage);
    await expect(todoPage.todoItems).toHaveCount(0);
  });
});
