import { useState } from 'react';
import { type Task, type TaskFormProps } from '../../types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { validate } from '../../utils/taskUtils';

// This component allows the user to create a new task or edit an existing task. The status and priority are shown with
// responsive colors to quickly highlight the top items to the user. The form is validated to ensure that the user entered
// some text for the title and description.

export function TaskForm({ onSave, onHideForm, taskInput }: TaskFormProps) {
  const [task, setTask] = useState<Task>(taskInput);
  const [errorMessage, setErrorMessage] = useState('');

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    const newTask: Task = { ...task };

    newTask[name] = value;
    setTask(newTask);
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-black dark:border-gray-700">
      <div className="flex gap-5 items-start">
        <div className="w-full">
          <h3 className="text-lg font-semibold">
            <input
              autoFocus
              id="title"
              name="title"
              type="text"
              value={task.title}
              onChange={onChange}
              placeholder="Task title"
              className="border rounded-md mb-2 py-1 px-2 w-full"
            />
          </h3>
          <p className="text-gray-600">
            <input
              id="description"
              name="description"
              type="text"
              value={task.description}
              onChange={onChange}
              placeholder="Task description"
              className="border rounded-md py-1 px-2 w-full"
            />
          </p>
        </div>
        <div>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={onChange}
            className={`px-2 py-1 border border-white hover:border-black focus:border-black rounded-md ${
              task.status === 'To Do'
                ? 'bg-yellow-50 text-yellow-700'
                : task.status === 'Done'
                ? 'bg-green-50 text-green-700'
                : 'bg-blue-50 text-blue-700'
            }`}
          >
            <option value="To Do" className="bg-yellow-50 text-yellow-700">
              Pending
            </option>
            <option value="In Progress" className="bg-green-50 text-green-700">
              In Progress
            </option>
            <option value="Done" className="bg-blue-50 text-blue-700">
              Completed
            </option>
          </select>
        </div>
      </div>
      <div className="mt-2 flex gap-5 text-sm items-center">
        <select
          id="priority"
          name="priority"
          value={task.priority}
          onChange={onChange}
          className={`py-1 border border-white hover:border-black focus:border-black rounded-md ${
            task.priority === '3-low'
              ? 'bg-green-50 text-green-500'
              : task.priority === '2-medium'
              ? 'bg-yellow-50 text-yellow-500'
              : 'bg-red-50 text-red-500'
          }`}
        >
          <option value="1-high" className="bg-red-50 text-red-700">
            High
          </option>
          <option value="2-medium" className="bg-yellow-50 text-yellow-700">
            Medium
          </option>
          <option value="3-low" className="bg-green-50 text-green-700">
            Low
          </option>
        </select>
        <span className="text-gray-500">
          Due:&nbsp;
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={task.dueDate}
            onChange={onChange}
            className="border rounded-md py-1 px-2 w-fit"
          />
        </span>
        <button
          title="Add task"
          id="addTask"
          className="w-fit py-1 text-blue-500 bg-blue-100 hover:cursor-pointer hover:text-blue-700 hover:bg-blue-200 focus:bg-blue-200 px-3 rounded-md border border-white hover:border-black focus:border-black"
          onClick={() => {
            const err = validate({ task });
            if (err) {
              setErrorMessage(err);
            } else {
              onSave(task);
              onHideForm();
            }
          }}
        >
          <PencilIcon className="size-6 text-blue-600" />
        </button>
        <button
          title="Delete task"
          id="delete"
          className="py-1 text-red-500 bg-red-50 hover:cursor-pointer hover:text-red-700 hover:bg-red-100 focus:bg-red-100 px-3 rounded-md border border-white hover:border-black focus:border-black"
          onClick={() => onHideForm()}
        >
          <TrashIcon className="size-6 text-red-600" />
        </button>
      </div>
      {errorMessage && (
        <div
          id="errorMessage"
          className="mt-2 w-fit p-2 rounded-md text-red-700 bg-red-50 text-xl mx-auto"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}
