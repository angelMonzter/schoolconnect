import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import WelcomeSection from './components/WelcomeSection';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/parent-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Container */}
      <div className="flex min-h-screen">
        {/* Welcome Section - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-8 xl:p-12">
          <div className="w-full max-w-2xl mx-auto flex items-center">
            <WelcomeSection />
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Welcome Header */}
            <div className="lg:hidden mb-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                SchoolConnect
              </h1>
              <p className="text-muted-foreground">
                Portal de comunicación escolar para padres
              </p>
            </div>

            <LoginForm />

            {/* Mobile Features Preview */}
            <div className="lg:hidden mt-8 grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-foreground">Progreso</h3>
                <p className="text-xs text-muted-foreground">Académico</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-foreground">Mensajes</h3>
                <p className="text-xs text-muted-foreground">Profesores</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} SchoolConnect. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;