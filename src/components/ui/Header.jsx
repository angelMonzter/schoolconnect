import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const Header = ({ selectedChild, onChildChange, notificationCounts = {}, isCollapsed = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/parent-dashboard', 
      icon: 'Home',
      tooltip: 'Resumen general de todos los hijos'
    },
    { 
      label: 'Progreso Académico', 
      path: '/academic-progress', 
      icon: 'TrendingUp',
      tooltip: 'Seguimiento del rendimiento académico'
    },
    { 
      label: 'Tareas', 
      path: '/assignment-tracking', 
      icon: 'BookOpen',
      tooltip: 'Gestión de tareas y asignaciones'
    },
    { 
      label: 'Calendario', 
      path: '/school-calendar', 
      icon: 'Calendar',
      tooltip: 'Eventos escolares y fechas importantes'
    },
    { 
      label: 'Mensajes', 
      path: '/messaging-center', 
      icon: 'MessageCircle',
      tooltip: 'Centro de comunicación con profesores'
    }
  ];

  const childrenOptions = [
    { value: 'child1', label: 'María González (5° Grado)' },
    { value: 'child2', label: 'Carlos González (3° Grado)' },
    { value: 'child3', label: 'Ana González (1° Grado)' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsAccountMenuOpen(false);
  };

  const getNotificationCount = (path) => {
    const pathKey = path?.replace('/', '')?.replace('-', '_');
    return notificationCounts?.[pathKey] || 0;
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAccountMenuOpen && !event?.target?.closest('.account-menu-container')) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAccountMenuOpen]);

  return (
    <header className="sticky top-0 z-navigation bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="font-heading font-semibold text-xl text-foreground">
              SchoolConnect
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => {
            const isActive = isActivePath(item?.path);
            const notificationCount = getNotificationCount(item?.path);
            
            return (
              <div key={item?.path} className="relative">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-102"
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={16} className="mr-2" />
                  {item?.label}
                </Button>
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 z-notification-badge">
                    <div className="bg-accent text-accent-foreground text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-bounce-gentle">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Multi-Child Selector */}
          {location?.pathname !== '/login' && (
            <div className="hidden md:block">
              <Select
                options={childrenOptions}
                value={selectedChild}
                onChange={onChildChange}
                placeholder="Seleccionar hijo"
                className="min-w-[200px]"
              />
            </div>
          )}

          {/* Account Menu */}
          {location?.pathname !== '/login' && (
            <div className="relative account-menu-container">
              <Button
                variant="ghost"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2"
              >
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <span className="hidden md:block font-medium text-sm">
                  Carmen González
                </span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 z-dropdown animate-fade-in">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="font-medium text-sm text-foreground">Carmen González</p>
                      <p className="text-xs text-muted-foreground">carmen@email.com</p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="w-full justify-start px-4 py-2 text-sm"
                    >
                      <Icon name="Settings" size={16} className="mr-2" />
                      Configuración
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="w-full justify-start px-4 py-2 text-sm"
                    >
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Ayuda
                    </Button>
                    <div className="border-t border-border mt-2 pt-2">
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start px-4 py-2 text-sm text-error hover:text-error hover:bg-error/10"
                      >
                        <Icon name="LogOut" size={16} className="mr-2" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-mobile-overlay lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-card shadow-elevation-modal animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-heading font-semibold text-lg">Navegación</span>
              <Button
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Mobile Child Selector */}
              {location?.pathname !== '/login' && (
                <div className="pb-4 border-b border-border">
                  <Select
                    options={childrenOptions}
                    value={selectedChild}
                    onChange={onChildChange}
                    placeholder="Seleccionar hijo"
                    className="w-full"
                  />
                </div>
              )}

              {/* Mobile Navigation Items */}
              <nav className="space-y-2">
                {navigationItems?.map((item) => {
                  const isActive = isActivePath(item?.path);
                  const notificationCount = getNotificationCount(item?.path);
                  
                  return (
                    <div key={item?.path} className="relative">
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        onClick={() => handleNavigation(item?.path)}
                        className="w-full justify-start px-4 py-3 text-left"
                      >
                        <Icon name={item?.icon} size={20} className="mr-3" />
                        <span className="flex-1">{item?.label}</span>
                        {notificationCount > 0 && (
                          <div className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full min-w-[20px] h-[20px] flex items-center justify-center">
                            {notificationCount > 99 ? '99+' : notificationCount}
                          </div>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;