import { useEffect, useState } from 'react';
import { backendClient } from '../clients/backendClient';
import { useNavigate } from 'react-router-dom';
import type { TaskType } from '../types';

function TasksPage({ token, projectId }: { token: string; projectId: string }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(new Array<TaskType>());

  const fetchTasks = async () => {
    try {
      if (!token)
        return navigate(
          import.meta.env.PROD
            ? `${import.meta.env.VITE_FRONTEND_BASE}/signin`
            : `../signin`
        );

      const res = await backendClient.get(`/projects/${projectId}/tasks`);

      setTasks(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token)
      return navigate(
        import.meta.env.PROD
          ? `${import.meta.env.VITE_FRONTEND_BASE}/signin`
          : `../signin`
      );

    try {
      const res = await backendClient.post('/projects', { title, body });

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="flex flex-col gap-5">
      <h1>Tasks for Your Project</h1>
      {tasks.map((task, index) => (
        <section
          key={index}
          className="border rounded-lg bg-gray-100 dark:bg-gray-900 p-5"
        >
          <h2 className="text-center font-bold">{task.title}</h2>
          <h3>{task.description}</h3>
          <h4>{task.status}</h4>
        </section>
      ))}
      <form
        onSubmit={handleSubmit}
        className="border rounded-lg bg-gray-100 dark:bg-gray-900 p-5"
      >
        <h2>What's in your mind?</h2>
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
    </main>
  );
}

export default TasksPage;
