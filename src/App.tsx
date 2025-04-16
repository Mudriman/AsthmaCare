import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppLayout } from './components/AppLayout';

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <AppLayout />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}