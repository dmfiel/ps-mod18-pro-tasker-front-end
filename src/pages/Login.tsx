import { useState } from 'react';
import { backendClient } from '../clients/backendClient';
import { useNavigate } from 'react-router-dom';

function LoginPage({ saveToken }: { saveToken: (_token: string) => void }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: import.meta.env.VITE_DEFAULT_LOGIN || '',
    password: import.meta.env.VITE_DEFAULT_PASSWORD || ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await backendClient.post('/users/login', { ...formData });
      console.log(res.data);
      saveToken(res.data.token);
      navigate(
        import.meta.env.PROD
          ? `${import.meta.env.VITE_FRONTEND_BASE}/projects`
          : `../projects`
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };
  return (
    <main className="border rounded-lg p-5 bg-gray-100 dark:bg-gray-900">
      <h1 className="">Welcome to Pro Tasker</h1>
      <h2>Please login to track your projects.</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email" className="mt-5">
          Email Address:
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
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
