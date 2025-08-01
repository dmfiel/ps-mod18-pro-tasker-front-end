import { useState } from 'react';
import {
  type Priority,
  type Sort,
  type TaskFilterProps,
  type TaskStatus
} from '../../types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// This component provides an interface for the use to show parts of the task list
// based on filtering by status or priority. Tasks can also be sorted by status,
// priority, or due date. And the user can search the task titles and descriptions
// by keyword to find what they need. All these choices are passed by to the
// TaskList parent component to update the display.

export function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [searchText, setSearchText] = useState('');

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
    onFilterChange({ searchText: event.target.value });
  }

  function keyHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onFilterChange({ searchText: searchText });
    }
    if (event.key === 'Escape') {
      setSearchText('');
      onFilterChange({ searchText: '' });
    }
  }

  return (
    <nav
      role="navigation"
      className="flex flex-col gap-5 p-5 bg-green-50 dark:bg-green-950 border rounded-lg w-fit mx-auto"
    >
      <div id="filters" className="flex gap-5 w-fit mx-auto">
        <div>
          <label
            htmlFor="status-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            onChange={e =>
              onFilterChange({ status: e.target.value as TaskStatus })
            }
            id="status-filter"
            className="bg-white dark:bg-gray-800 px-2 py-1 block w-full rounded-md shadow-sm border border-white hover:cursor-pointer hover:border-black focus:border-black"
          >
            <option value="all">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="priority-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Priority
          </label>
          <select
            onChange={e =>
              onFilterChange({ priority: e.target.value as Priority })
            }
            id="priority-filter"
            className="bg-white dark:bg-gray-800 px-2 py-1 block w-full rounded-md shadow-sm border border-white hover:cursor-pointer hover:border-black focus:border-black"
          >
            <option value="all">All Priorities</option>
            <option value="1-high">High</option>
            <option value="2-medium">Medium</option>
            <option value="3-low">Low</option>
          </select>
        </div>{' '}
        <div>
          <label
            htmlFor="sort-order"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sort By
          </label>
          <select
            onChange={e => onFilterChange({ sort: e.target.value as Sort })}
            id="sort-order"
            className="bg-white dark:bg-gray-800 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border border-white hover:cursor-pointer hover:border-black focus:border-black"
          >
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="date">Due Date</option>
          </select>
        </div>
      </div>
      <div id="search" className="flex gap-5 w-full ">
        <input
          type="text"
          value={searchText}
          onChange={changeHandler}
          onKeyDown={keyHandler}
          placeholder="Search for tasks"
          className="bg-white dark:bg-gray-800 border rounded-md py-1 px-2 w-full"
        />
        <button
          title="Search"
          id="search"
          className="text-blue-500 bg-blue-100 hover:cursor-pointer hover:text-blue-700 hover:bg-blue-200 focus:bg-blue-200 px-3 rounded-md"
          onClick={() => onFilterChange({ searchText: searchText })}
        >
          <MagnifyingGlassIcon className="size-6 text-blue-600" />
        </button>
      </div>
    </nav>
  );
}
