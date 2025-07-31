import { useState } from 'react';
import type { TaskType } from '../../types';
import { backendClient } from '../../clients/backendClient';
import IconButton from '../IconButton/IconButton';

export function AddTask({
  projectId,
  fetchTasks
}: {
  projectId: string;
  fetchTasks: () => void;
}) {
  const emptyTask = {
    title: '',
    description: '',
    status: 'To Do'
  };
  const [taskFields, setTaskFields] = useState<TaskType>(emptyTask);

  function clearTaskFields() {
    setTaskFields(emptyTask);
  }

  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('createTask');
    await saveTask();
  }

  async function saveTask() {
    console.log('saveTask');
    try {
      console.log(taskFields);
      const res = await backendClient.post(`/tasks/`, {
        ...taskFields,
        project: projectId
      });
      console.log(res);

      clearTaskFields();
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  function onChangeTask(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setTaskFields({
      ...taskFields,
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  return (
    <form
      onSubmit={createTask}
      className="flex justify-between items-start p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-black dark:border-gray-700"
    >
      <div className="flex flex-col gap-2">
        <input
          autoFocus
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskFields?.title || ''}
          onChange={onChangeTask}
          className="text-lg font-semibold border border-black dark:border-white px-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={taskFields?.description || ''}
          onChange={onChangeTask}
          className="text-gray-600 border border-black dark:border-white px-2"
        />
      </div>
      <div className="flex gap-2">
        <select
          name="status"
          value={taskFields?.status || 'To Do'}
          onChange={onChangeTask}
          className={`px-2 py-1 border border-white hover:cursor-pointer hover:border-black focus:border-black rounded-md mx-2 ${
            taskFields?.status === 'To Do'
              ? 'bg-yellow-50 text-yellow-700'
              : taskFields?.status === 'Done'
              ? 'bg-green-50 text-green-700'
              : 'bg-blue-50 text-blue-700'
          }`}
        >
          <option value="To Do" className="bg-yellow-50 text-yellow-700">
            To Do
          </option>
          <option value="In Progress" className="bg-green-50 text-green-700">
            In Progress
          </option>
          <option value="Done" className="bg-blue-50 text-blue-700">
            Done
          </option>
        </select>
        <IconButton icon="Edit" title="Save Task" />{' '}
        <IconButton
          icon="Delete"
          title="Discard Task"
          onClick={() => {
            clearTaskFields();
            fetchTasks();
          }}
        />
      </div>
    </form>
  );
}
