import { useState } from 'react';
import { backendClient } from '../clients/backendClient';
import { useNavigate } from 'react-router-dom';
import GitHubButton from '../assets/github.png';

function LoginPage({
  saveToken,
  setLoading
}: {
  saveToken: (_token: string) => void;
  setLoading: (_loading: boolean) => void;
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: import.meta.env.VITE_DEFAULT_LOGIN || '',
    password: import.meta.env.VITE_DEFAULT_PASSWORD || ''
  });

  const handleGitHub = () => {
    setLoading(true);
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/auth/github`,
      '_self'
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await backendClient.post('/users/login', { ...formData });
      setLoading(false);
      saveToken(res.data.token);
      navigate(
        import.meta.env.PROD
          ? `${import.meta.env.VITE_FRONTEND_BASE}/projects`
          : `../projects`
      );
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  //   .loginButton{
  //   width: 150px;
  //   padding: 15px 25px;
  //   border-radius: 5px;
  //   color: white;
  //   display: flex;
  //   align-items: center;
  //   font-weight: bold;
  //   margin-bottom: 20px;
  //   cursor: pointer;
  // }

  // .google{
  //   background-color: #df4930;
  // }
  // .facebook{
  //   background-color: #507cc0;
  // }

  return (
    <main className="border rounded-lg drop-shadow-lg p-5 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-center">Welcome to Pro Tasker</h1>
      <h2>Please login to track your projects.</h2>
      <div
        onClick={handleGitHub}
        className="bg-black mx-auto mt-5 w-35 py-3 px-4 rounded border text-white flex items-center  cursor-pointer"
      >
        <img
          src={GitHubButton}
          alt="Login with GitHub"
          className="mr-2.5 w-5 h-5"
        />
        GitHub
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email" className="mt-5">
          Email Address:
        </label>
        <input
          autoFocus
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required={true}
          className="border rounded px-2 py-1 text-gray-500"
        />

        <label htmlFor="password" className="mt-5">
          Password:
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required={true}
          className="border rounded px-2 py-1 text-gray-500"
        />

        <input
          type="submit"
          value="Login"
          className="border rounded mx-auto px-2 py-1 mt-5 bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800"
        />
      </form>
    </main>
  );
}

export default LoginPage;
