import { useEffect, useState } from 'react';
import { backendClient } from '../clients/backendClient';
import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '../components/IconButton/IconButton';
import type { AxiosResponse } from 'axios';
import { isEmpty } from '../utils/isEmpty';
import type { ProjectType, TaskType } from '../types';
import { TaskItem } from '../components/TaskItem/TaskItem';

function ProjectPage({ token }: { token: string }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectType>();
  const [tasks, setTasks] = useState(new Array<TaskType>());
  const [edit, setEdit] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const { projectId } = useParams();
  const [projectFields, setProjectFields] = useState<ProjectType>();

  const emptyTask = {
    title: '',
    description: '',
    status: 'To Do'
  };
  const [taskFields, setTaskFields] = useState<TaskType>(emptyTask);

  function clearTaskFields() {
    setTaskFields(emptyTask);
  }

  const gotoLogin = () => {
    navigate(
      import.meta.env.PROD
        ? `${import.meta.env.VITE_FRONTEND_BASE}/signin`
        : `../signin`
    );
  };

  const fetchProject = async () => {
    try {
      if (!token) return gotoLogin();

      const res = await backendClient.get(`/projects/${projectId}`);
      if (!res || isEmpty(res)) return gotoLogin();

      setProject(res.data);
      setProjectFields(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      if (!token) return gotoLogin();

      const res = await backendClient.get(`/projects/${projectId}/tasks`);

      setTasks(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return gotoLogin();

    try {
      if (projectFields) {
        const res = await backendClient.put(
          `/projects/${projectId}`,
          projectFields
        );
        console.log(res);
        setProject(projectFields);
      }

      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, []);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (projectFields)
      setProjectFields({
        ...projectFields,
        [e.currentTarget.name]: e.currentTarget.value
      });
  }

  async function onDelete() {
    try {
      const res = await backendClient.delete(`/projects/${projectId}`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
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
      setAddTask(false);
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
    <main className="flex flex-col gap-5">
      {!edit && project && (
        <section className="border rounded-lg bg-gray-100 dark:bg-gray-900 p-5">
          <h1 className="text-center font-bold">
            {project.name}{' '}
            <IconButton
              icon="Edit"
              title="Edit Project"
              onClick={() => setEdit(true)}
            />{' '}
            <IconButton
              icon="Delete"
              title="Delete Project"
              onClick={onDelete}
            />
            <IconButton
              icon="Add"
              title="Create Task"
              onClick={() => setAddTask(true)}
            />
          </h1>
          <h2>{project.description}</h2>
        </section>
      )}

      {edit && !isEmpty(projectFields) && projectFields && (
        <form
          onSubmit={handleSubmit}
          className="border rounded-lg bg-gray-100 dark:bg-gray-900 p-5 flex flex-col gap-2 justify-between items-start "
        >
          <h2>Update your project:</h2>
          <label htmlFor="name" />
          <input
            autoFocus
            type="text"
            title="Project Name"
            placeholder="Project Name"
            name="name"
            value={projectFields.name}
            onChange={onChange}
            className="text-lg font-semibold border border-black dark:border-white px-2"
          />

          <label htmlFor="description" />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={projectFields.description}
            onChange={onChange}
            className="text-gray-600 border border-black dark:border-white px-2"
          />

          <input type="submit" value="Post" />
        </form>
      )}

      {addTask && (
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
            <IconButton icon="Edit" title="Save Task" />{' '}
            <IconButton
              icon="Delete"
              title="Discard Task"
              onClick={() => {
                clearTaskFields();
                setAddTask(false);
              }}
            />
          </div>
        </form>
      )}

      {tasks &&
        !isEmpty(tasks) &&
        tasks.map(task => (
          <TaskItem key={task._id} task={task} refreshTasks={fetchTasks} />
        ))}
    </main>
  );
}

export default ProjectPage;
