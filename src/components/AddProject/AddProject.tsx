import { useState } from 'react';
import { backendClient } from '../../clients/backendClient';
import IconButton from '../IconButton/IconButton';

export function AddProject({ fetchProjects }: { fetchProjects: () => void }) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  function clearProjectFields() {
    setProjectName('');
    setDescription('');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await backendClient.post('/projects', {
        name: projectName,
        description
      });
      clearProjectFields();
      fetchProjects();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-lg drop-shadow-lg bg-gray-100 dark:bg-gray-900 p-5 flex flex-col gap-2"
    >
      <h2>Create a new project:</h2>
      <label htmlFor="name" />
      <input
        autoFocus
        type="text"
        title="Project Name"
        placeholder="Project Name"
        name="name"
        value={projectName}
        onChange={e => setProjectName(e.target.value)}
        className="text-lg font-semibold border border-black dark:border-white px-2"
      />
      <label htmlFor="description" />
      <input
        type="text"
        name="description"
        placeholder="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="text-gray-600 border border-black dark:border-white px-2"
      />
      <IconButton icon="Edit" title="Save Project" />{' '}
      <IconButton
        icon="Delete"
        title="Discard Project"
        onClick={() => {
          clearProjectFields();
          fetchProjects();
        }}
      />
    </form>
  );
}
