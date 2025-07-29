import { NavLink } from 'react-router-dom';

function NavBar({
  token,
  saveToken
}: {
  token: string;
  saveToken: (_token: string) => void;
}) {
  return (
    <nav className="flex gap-5 mx-auto">
      <NavLink to={`${import.meta.env.VITE_FRONTEND_URL}/projects`}>
        Projects
      </NavLink>
      <NavLink to={`${import.meta.env.VITE_FRONTEND_URL}/`}>Home</NavLink>
      {!token && (
        <NavLink to={`${import.meta.env.VITE_FRONTEND_URL}/register`}>
          Register
        </NavLink>
      )}
      {!token && (
        <NavLink to={`${import.meta.env.VITE_FRONTEND_URL}/signin`}>
          Login
        </NavLink>
      )}
      {token && (
        <NavLink
          to={`${import.meta.env.VITE_FRONTEND_URL}/`}
          onClick={() => saveToken('')}
        >
          Logout
        </NavLink>
      )}
    </nav>
  );
}
export default NavBar;
