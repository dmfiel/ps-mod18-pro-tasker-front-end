import type { Filters, Sort, TaskType } from '../types';

// These utilty functions are used to sort, filter, and validate tasks
// as well as formatting dates per the user's locale for display.

export function sortCompare(a: TaskType, b: TaskType, sortOrder: Sort): number {
  switch (sortOrder) {
    case 'status':
      if (a.status === b.status) return 0;
      return a.status < b.status ? 1 : -1;
      break;
    case 'date':
      if (a.dueDate === b.dueDate || !a.dueDate || !b.dueDate) return 0;
      return a.dueDate > b.dueDate ? 1 : -1;
      break;
    case 'priority':
    default:
      if (a.priority === b.priority || !a.priority || !b.priority) return 0;
      return a.priority > b.priority ? 1 : -1;
  }
  return 1;
}

export function filterTasks(tasks: TaskType[], filters: Filters): TaskType[] {
  return tasks
    .filter(
      task =>
        task.status !== '4-deleted' &&
        (filters.status === 'all' || filters.status === task.status) &&
        (filters.priority === 'all' || filters.priority === task.priority) &&
        (!filters.searchText ||
          task.title.toLowerCase().includes(filters.searchText) ||
          task.description.toLowerCase().includes(filters.searchText))
    )
    .sort((a, b) => sortCompare(a, b, filters.sort || 'priority'));
}

export function validate({ task }: { task: TaskType }): string {
  if (!task.title) return 'Please enter a task title';
  if (!task.description) return 'Please enter a task description';
  return '';
}

export function dateFormat(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  return new Intl.DateTimeFormat(navigator.language, options).format(date);
}
