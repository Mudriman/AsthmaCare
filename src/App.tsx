import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AppLayout } from './components/AppLayout';
import { initializeAuth} from './stores/authStore'; // Импортируем инициализацию
import { initializeUserData } from './stores/userDataStore';

export function App() {
  initializeAuth();
  initializeUserData();

  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  );
}