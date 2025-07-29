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
  const { projectId } = useParams();

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
      const res = await backendClient.post('/projects', { title, body });

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, []);

  return (
    <main className="flex flex-col gap-5">
      {!edit && project && (
        <section className="border rounded-lg bg-gray-100 dark:bg-gray-900 p-5">
          <h1 className="text-center font-bold">{project.name}</h1>
          <h2>{project.description}</h2>
        </section>
      )}

      {edit && (
        <form
          onSubmit={handleSubmit}
          className="border rounded-lg bg-gray-100 dark:bg-gray-900 p-5"
        >
          <h2>Update your project:</h2>
          <label htmlFor="title" />
          <input
            type="text"
            title={title}
            placeholder="title"
            name="title"
            onChange={e => setTitle(e.target.value)}
          />

          <label htmlFor="body" />
          <input
            type="text"
            name="body"
            placeholder="body"
            value={body}
            onChange={e => setBody(e.target.value)}
          />

          <input type="submit" value="Post" />
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
