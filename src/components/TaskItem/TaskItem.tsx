import { useState } from 'react';
import { backendClient } from '../../clients/backendClient';
import { type TaskItemProps, type TaskType } from '../../types/index';
import IconButton from '../IconButton/IconButton';
// import { dateFormat } from '../../utils/taskUtils';

// This component renders an individual task. The status and priority are shown with
// responsive colors to quickly highlight the top items to the user. Interactive controls
// are available for the user to change task status or delete unneeded items.

export function TaskItem({
  task,
  refreshTasks
}: // ,
// onStatusChange,
// onDelete,
// onEdit,
// onShowForm
TaskItemProps) {
  const [taskFields, setTaskFields] = useState<TaskType>(task);
  const [edit, setEdit] = useState(false);

  async function updateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await backendClient.put(`/tasks/${task._id}`, {
        ...taskFields
      });
      console.log(res);

      setEdit(false);
      refreshTasks();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e);
    try {
      const res = await backendClient.put(`/tasks/${task._id}`, {
        status: e.currentTarget.value
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setTaskFields({
      ...taskFields,
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  async function onDelete() {
    try {
      const res = await backendClient.delete(`/tasks/${task._id}`);
      console.log(res);

      refreshTasks();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-black dark:border-gray-700">
      {!edit && (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{taskFields.title}</h3>
            <p className="text-gray-600">{taskFields.description}</p>
          </div>
          <div className="flex gap-2">
            <select
              name="status"
              value={taskFields.status}
              onChange={updateStatus}
              className={`px-2 py-1 border border-white hover:cursor-pointer hover:border-black focus:border-black rounded-md mx-2 ${
                taskFields.status === 'To Do'
                  ? 'bg-yellow-50 text-yellow-700'
                  : taskFields.status === 'Done'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-blue-50 text-blue-700'
              }`}
            >
              <option value="To Do" className="bg-yellow-50 text-yellow-700">
                To Do
              </option>
              <option
                value="In Progress"
                className="bg-green-50 text-green-700"
              >
                In Progress
              </option>
              <option value="Done" className="bg-blue-50 text-blue-700">
                Done
              </option>
            </select>
            <IconButton
              icon="Edit"
              title="Edit Task"
              onClick={() => setEdit(true)}
            />{' '}
            <IconButton icon="Delete" title="Delete Task" onClick={onDelete} />
          </div>
        </div>
      )}
      {edit && (
        <form
          onSubmit={updateTask}
          className="flex justify-between items-start "
        >
          <div className="flex flex-col gap-2">
            <input
              autoFocus
              type="text"
              name="title"
              value={taskFields.title}
              onChange={onChange}
              className="text-lg font-semibold border border-black dark:border-white px-2"
            />
            <input
              type="text"
              name="description"
              value={taskFields.description}
              onChange={onChange}
              className="text-gray-600 border border-black dark:border-white px-2"
            />
          </div>
          <div className="flex gap-2">
            <select
              name="status"
              value={taskFields.status}
              onChange={onChange}
              className={`px-2 py-1 border border-white hover:cursor-pointer hover:border-black focus:border-black rounded-md mx-2 ${
                taskFields.status === 'To Do'
                  ? 'bg-yellow-50 text-yellow-700'
                  : taskFields.status === 'Done'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-blue-50 text-blue-700'
              }`}
            >
              <option value="To Do" className="bg-yellow-50 text-yellow-700">
                To Do
              </option>
              <option
                value="In Progress"
                className="bg-green-50 text-green-700"
              >
                In Progress
              </option>
              <option value="Done" className="bg-blue-50 text-blue-700">
                Done
              </option>
            </select>
            <input type="submit" value="Save" />
          </div>
        </form>
      )}
    </div>
  );
}
