import { useEffect, useState } from 'react';
import { backendClient } from '../clients/backendClient';
import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '../components/IconButton/IconButton';
import { isEmpty } from '../utils/isEmpty';
import type { Filters, ProjectType, TaskType } from '../types';
import { TaskItem } from '../components/TaskItem/TaskItem';
import { AddTask } from '../components/AddTask/AddTask';
import { TaskFilter } from '../components/TaskFilter/TaskFilter';
import { filterTasks } from '../utils/taskUtils';

function ProjectPage({ token }: { token: string }) {
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectType>();
  const [tasks, setTasks] = useState(new Array<TaskType>());
  const [edit, setEdit] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const { projectId } = useParams();
  const [projectFields, setProjectFields] = useState<ProjectType>();

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
      setAddTask(false);

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

      // project has been deleted, so there is nothing to show here
      // go back to the projects page
      navigate(
        import.meta.env.PROD
          ? `${import.meta.env.VITE_FRONTEND_BASE}/projects`
          : `../projects`
      );
    } catch (error) {
      console.error(error);
    }
  }

  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    priority: 'all',
    sort: 'priority',
    searchText: ''
  });
  function onFilterChange({ status, priority, sort, searchText }: Filters) {
    const newFilters: Filters = { ...filters };
    if (status) newFilters.status = status;
    if (priority) newFilters.priority = priority;
    if (sort) newFilters.sort = sort;
    newFilters.searchText = searchText ? searchText.toLowerCase() : '';
    setFilters(newFilters);
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

      {addTask && projectId && (
        <AddTask projectId={projectId} fetchTasks={fetchTasks} />
      )}

      {tasks && !isEmpty(tasks) && (
        <>
          <TaskFilter onFilterChange={onFilterChange} />
          {filterTasks(tasks, filters).map(task => (
            <TaskItem key={task._id} task={task} refreshTasks={fetchTasks} />
          ))}
        </>
      )}
    </main>
  );
}

export default ProjectPage;
