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
    <main>
      <h1 className="mt-5">Welcome to Pro Tasker</h1>
      <h2>Please login to track your projects.</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label htmlFor="email" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border"
        />

        <label htmlFor="password" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border"
        />

        <input type="submit" value="Login" className="border" />
      </form>
    </main>
  );
}

export default LoginPage;
