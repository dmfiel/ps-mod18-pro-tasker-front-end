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
    <main>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label htmlFor="username" />
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={formData.username}
          onChange={handleChange}
          className="border"
        />

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

        <input type="submit" value="Register" className="border" />
      </form>
    </main>
  );
}

export default RegisterPage;
