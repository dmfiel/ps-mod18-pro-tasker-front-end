import { useEffect, useState } from 'react';
import { backendClient } from '../clients/backendClient';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '../components/IconButton/IconButton';
import type { ProjectType, TaskType } from '../types';
import { AddProject } from '../components/AddProject/AddProject';
import { Dashboard } from '../components/Dashboard/Dashboard';

function ProjectsPage({
  token,
  setLoading
}: {
  token: string;
  setLoading: (_loading: boolean) => void;
}) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(new Array<ProjectType>());
  const [addProject, setAddProject] = useState(false);
  const [tasks, setTasks] = useState(new Array<TaskType>());

  const fetchProjects = async () => {
    try {
      if (!token)
        return navigate(
          import.meta.env.PROD
            ? `${import.meta.env.VITE_FRONTEND_BASE}/signin`
            : `../signin`
        );

      const res = await backendClient.get('/projects');
      setProjects(res.data);
      setAddProject(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await backendClient.get(`/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    setLoading(false);
  }, []);

  return (
    <main className="flex flex-col gap-5">
      {!addProject && (
        <>
          <Dashboard tasks={tasks} />

          <h1>
            Your Projects{' '}
            <IconButton
              icon="Add"
              title="Create Project"
              onClick={() => setAddProject(true)}
            />
          </h1>
          {projects.map(project => (
            <section
              key={project._id}
              className="border rounded-lg drop-shadow-lg bg-gray-100 dark:bg-gray-900 p-5"
            >
              <NavLink
                to={`${import.meta.env.VITE_FRONTEND_URL}/project/${
                  project._id
                }`}
              >
                <h2 className="text-center font-bold">{project.name}</h2>
              </NavLink>
            </section>
          ))}
        </>
      )}
      {addProject && <AddProject fetchProjects={fetchProjects} />}
    </main>
  );
}

export default ProjectsPage;
