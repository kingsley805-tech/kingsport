import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import Portfolio from './pages/Portfolio';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
