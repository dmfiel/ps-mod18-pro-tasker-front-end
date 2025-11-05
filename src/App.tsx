import './App.css';
import { useContext, useEffect, useState } from 'react';
import ThemeProvider, {
  BG_DARK,
  BG_LIGHT,
  ThemeButton,
  ThemeContext
} from './context/ThemeContext';
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { HomePage } from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import Navbar from './components/Navbar';
import ProjectsPage from './pages/ProjectsPage';
import { backendClient, setupCatch401 } from './clients/backendClient';
import ProjectPage from './pages/ProjectPage';
import bgLight from './assets/bg-light.jpg';
import bgDark from './assets/bg-dark.jpg';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ThemeWrapper />
      </ThemeProvider>
    </BrowserRouter>
  );
}

function ThemeWrapper() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem('pro-tasker-app-token') || ''
  );

  function saveToken(token: string) {
    setToken(token);
  }

  useEffect(() => {
    if (searchParams.has('token')) {
      const tokenParam = searchParams.get('token');
      if (tokenParam && tokenParam.length > 5) {
        setToken(tokenParam);
        // Remove the token parameter, so we don't try to login again
        searchParams.delete('token');
      }
    }
  });

  useEffect(() => {
    localStorage.setItem('pro-tasker-app-token', token);
    backendClient.defaults.headers.common['Authorization'] = token;
    // update the JWT token for subsequent requests
  }, [token]);

  setupCatch401(navigate, token);

  return (
    <div
      id="all"
      className={`${theme} w-full h-full bg-no-repeat bg-center bg-cover
       bg-[${BG_LIGHT}] dark:bg-[${BG_DARK}] text-black dark:text-white flex flex-col min-h-screen px-5 pt-5 wrap-anywhere text-xs md:text-sm lg:text-base`}
      style={{
        backgroundImage: `url('${theme === 'light' ? bgLight : bgDark}')`
      }}
    >
      <header className="grid grid-cols-3">
        <div></div>
        <h1 className="text-3xl font-bold text-center">Pro Tasker</h1>
        <div className="text-end">
          <ThemeButton />
        </div>
      </header>
      <Navbar token={token} saveToken={saveToken} />
      <main className="mx-auto my-5 flex-1 flex flex-col gap-5 items-center">
        <Routes>
          <Route
            path={`${import.meta.env.VITE_FRONTEND_BASE}/`}
            element={
              token ? (
                <ProjectsPage token={token} setLoading={setLoading} />
              ) : (
                <HomePage />
              )
            }
          />
          <Route
            path={`${import.meta.env.VITE_FRONTEND_BASE}/projects`}
            element={<ProjectsPage token={token} setLoading={setLoading} />}
          />
          <Route
            path={`${import.meta.env.VITE_FRONTEND_BASE}/register`}
            element={<RegisterPage setLoading={setLoading} />}
          />
          <Route
            path={`${import.meta.env.VITE_FRONTEND_BASE}/signin`}
            element={
              <LoginPage saveToken={saveToken} setLoading={setLoading} />
            }
          />
          <Route
            path={`${import.meta.env.VITE_FRONTEND_BASE}/project/:projectId`}
            element={<ProjectPage token={token} />}
          />
        </Routes>
        {loading && <LoadingSpinner text="Connecting, please be patient..." />}
      </main>
      <footer role="contentinfo">
        <a
          href="https://www.flaticon.com/free-icons/letter-f"
          title="letter f icons"
          target="_blank"
          className="text-center text-xs text-gray-500"
        >
          <p>Letter f icons created by rashedul.islam - Flaticon</p>{' '}
        </a>{' '}
      </footer>{' '}
    </div>
  );
}
export default App;
