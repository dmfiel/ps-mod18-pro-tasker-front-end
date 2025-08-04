import { useState } from 'react';
import { backendClient } from '../clients/backendClient';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await backendClient.post('/users/register', { ...formData });
      console.log(res.data);
      localStorage.setItem('pro-tasker-app-token', res.data.token);
      backendClient.defaults.headers.common['Authorization'] = res.data.token; // update the JWT token for subsequent requests
      return navigate(
        import.meta.env.PROD
          ? `${import.meta.env.VITE_FRONTEND_BASE}/signin`
          : `../signin`
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
    <main className="border rounded-lg drop-shadow-lg p-5 bg-gray-100 dark:bg-gray-900">
      <h1 className="font-bold">Registration Page</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="username" className="mt-5">
          User Name:
        </label>
        <input
          autoFocus
          type="text"
          name="username"
          placeholder="User Name"
          value={formData.username}
          onChange={handleChange}
          required={true}
          className="border rounded px-2 py-1 text-gray-500"
        />

        <label htmlFor="email" className="mt-5">
          Email Address:
        </label>
        <input
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
          value="Register"
          className="border rounded mx-auto px-2 py-1 mt-5 bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800"
        />
      </form>
    </main>
  );
}

export default RegisterPage;
