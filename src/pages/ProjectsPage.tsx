import { useEffect, useState } from 'react';
import { backendClient } from '../clients/backendClient';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '../components/IconButton/IconButton';
import type { ProjectType } from '../types';

function ProjectsPage({ token }: { token: string }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const [projects, setProjects] = useState(new Array<ProjectType>());

  const fetchprojects = async () => {
    try {
      if (!token)
        return navigate(
          import.meta.env.PROD
            ? `${import.meta.env.VITE_FRONTEND_BASE}/signin`
            : `../signin`
        );

      const res = await backendClient.get('/projects');

      setProjects(res.data);
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
    fetchprojects();
  }, []);

  return (
    <main className="flex flex-col gap-5">
      <h1>Your Projects</h1>
      {projects.map(project => (
        <section
          key={project._id}
          className="border rounded-lg bg-gray-100 dark:bg-gray-900 p-5"
        >
          <NavLink
            to={`${import.meta.env.VITE_FRONTEND_URL}/project/${project._id}`}
          >
            <h2 className="text-center font-bold">{project.name}</h2>
          </NavLink>
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

export default ProjectsPage;
