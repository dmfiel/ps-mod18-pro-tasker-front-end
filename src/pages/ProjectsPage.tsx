import { useEffect, useState } from 'react';
import { backendClient } from '../clients/backendClient';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '../components/IconButton/IconButton';
import type { ProjectType } from '../types';
import { AddProject } from '../components/AddProject/AddProject';

function ProjectsPage({ token }: { token: string }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(new Array<ProjectType>());
  const [addProject, setAddProject] = useState(false);

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

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="flex flex-col gap-5">
      {!addProject && (
        <>
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
              className="border rounded-lg bg-gray-100 dark:bg-gray-900 p-5"
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
