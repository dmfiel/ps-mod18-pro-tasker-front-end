import { NavLink } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <h1 className="mt-5">Welcome to Pro Tasker</h1>
      <h2>
        Please
        <NavLink
          to={`${import.meta.env.VITE_FRONTEND_URL}/signin`}
          className="font-bold rounded hover:bg-gray-200 dark:hover:bg-gray-700 p-1"
        >
          login
        </NavLink>
        to track your projects.
      </h2>
    </>
  );
}
