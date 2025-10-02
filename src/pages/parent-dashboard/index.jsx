import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MultiChildSelector from '../../components/ui/MultiChildSelector';
import QuickStatsCard from './components/QuickStatsCard';
import RecentActivityCard from './components/RecentActivityCard';
import TodayScheduleCard from './components/TodayScheduleCard';
import AnnouncementsCard from './components/AnnouncementsCard';
import NotificationCenter from './components/NotificationCenter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('child1');
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data for dashboard
  const quickStats = [
    {
      title: "Promedio General",
      value: "8.7",
      subtitle: "Último trimestre",
      icon: "Award",
      trend: 5,
      color: "success"
    },
    {
      title: "Tareas Pendientes",
      value: "3",
      subtitle: "Vencen esta semana",
      icon: "BookOpen",
      trend: -12,
      color: "warning"
    },
    {
      title: "Mensajes Sin Leer",
      value: "2",
      subtitle: "De profesores",
      icon: "MessageCircle",
      color: "primary"
    },
    {
      title: "Asistencia",
      value: "96%",
      subtitle: "Este mes",
      icon: "UserCheck",
      trend: 2,
      color: "success"
    }
  ];

  const recentActivities = [
    {
      type: "grade",
      title: "Nueva calificación en Matemáticas",
      description: "Examen de álgebra - Calificación: 9.2",
      timestamp: new Date(Date.now() - 1800000), // 30 min ago
      childName: "María González",
      urgent: false
    },
    {
      type: "assignment",
      title: "Tarea de Historia entregada",
      description: "Ensayo sobre la Revolución Industrial",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      childName: "Carlos González",
      urgent: false
    },
    {
      type: "message",
      title: "Mensaje de la profesora Ana López",
      description: "Recordatorio sobre la reunión de padres del viernes",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      childName: "María González",
      urgent: true
    },
    {
      type: "attendance",
      title: "Llegada tardía registrada",
      description: "Llegada a las 8:15 AM - Motivo: Cita médica",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      childName: "Ana González",
      urgent: false
    },
    {
      type: "event",
      title: "Inscripción confirmada",
      description: "Festival de ciencias - 15 de diciembre",
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      childName: "Carlos González",
      urgent: false
    }
  ];

  const todaySchedule = [
    {
      type: "class",
      title: "Matemáticas",
      startTime: "08:00",
      endTime: "09:00",
      location: "Aula 201",
      childName: "María González"
    },
    {
      type: "exam",
      title: "Examen de Ciencias",
      startTime: "10:30",
      endTime: "11:30",
      location: "Laboratorio",
      childName: "Carlos González"
    },
    {
      type: "meeting",
      title: "Reunión con Tutor",
      startTime: "14:00",
      endTime: "14:30",
      location: "Oficina de Orientación",
      childName: "Ana González"
    },
    {
      type: "event",
      title: "Ensayo de Obra Teatral",
      startTime: "15:30",
      endTime: "17:00",
      location: "Auditorio",
      childName: "María González"
    }
  ];

  const announcements = [
    {
      title: "Reunión General de Padres",
      content: `Estimados padres de familia,\n\nLes recordamos que el próximo viernes 15 de diciembre se llevará a cabo la reunión general de padres en el auditorio principal a las 18:00 horas.\n\nTemas a tratar:\n- Resultados académicos del trimestre\n- Actividades navideñas\n- Calendario del próximo año escolar\n- Propuestas de mejora\n\nSu asistencia es muy importante para el desarrollo educativo de sus hijos.`,
      author: "Dirección Académica",
      date: "2025-09-11",
      priority: "high",
      category: "Reuniones"
    },
    {
      title: "Festival de Ciencias 2025",
      content: `¡Invitamos a todos los estudiantes a participar en nuestro Festival de Ciencias!\n\nFecha: 20 de diciembre de 2025\nHora: 9:00 AM - 3:00 PM\nLugar: Patio central y laboratorios\n\nLos estudiantes podrán presentar proyectos de investigación, experimentos y demostraciones científicas. Habrá premios para los mejores proyectos en cada categoría.`,
      author: "Departamento de Ciencias",
      date: "2025-09-10",
      priority: "medium",
      category: "Eventos"
    },
    {
      title: "Cambio en el Menú Escolar",
      content: `A partir del lunes 16 de diciembre, implementaremos un nuevo menú escolar con opciones más saludables y variadas.\n\nIncluiremos:\n- Más frutas y verduras frescas\n- Opciones vegetarianas\n- Menús especiales para alergias alimentarias\n\nPor favor, informen sobre cualquier alergia o restricción alimentaria de sus hijos.`,
      author: "Servicios de Alimentación",
      date: "2025-09-09",
      priority: "low",
      category: "Servicios"
    }
  ];

  const mockNotifications = [
    {
      type: "grade",
      title: "Nueva calificación disponible",
      message: "María ha recibido una calificación de 9.5 en el examen de Literatura",
      timestamp: new Date(Date.now() - 900000),
      childName: "María González",
      read: false,
      urgent: false
    },
    {
      type: "assignment",
      title: "Tarea próxima a vencer",
      message: "La tarea de Matemáticas de Carlos vence mañana a las 23:59",
      timestamp: new Date(Date.now() - 1800000),
      childName: "Carlos González",
      read: false,
      urgent: true
    },
    {
      type: "message",
      title: "Mensaje del profesor",
      message: "La profesora de Inglés ha enviado un mensaje sobre el proyecto final",
      timestamp: new Date(Date.now() - 3600000),
      childName: "Ana González",
      read: true,
      urgent: false
    },
    {
      type: "attendance",
      title: "Ausencia registrada",
      message: "Se ha registrado una ausencia justificada para María el día de hoy",
      timestamp: new Date(Date.now() - 7200000),
      childName: "María González",
      read: true,
      urgent: false
    },
    {
      type: "payment",
      title: "Recordatorio de pago",
      message: "El pago de la mensualidad de diciembre vence en 3 días",
      timestamp: new Date(Date.now() - 10800000),
      childName: "Todos",
      read: false,
      urgent: true
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleChildChange = (childId) => {
    setSelectedChild(childId);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'grades': navigate('/academic-progress');
        break;
      case 'assignments': navigate('/assignment-tracking');
        break;
      case 'messages': navigate('/messaging-center');
        break;
      case 'calendar': navigate('/school-calendar');
        break;
      default:
        break;
    }
  };

  const handleMarkAsRead = (index) => {
    setNotifications(prev => 
      prev?.map((notification, i) => 
        i === index ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const breadcrumbItems = [
    { label: 'Inicio', path: '/parent-dashboard', icon: 'Home' }
  ];

  const notificationCounts = {
    parent_dashboard: 0,
    academic_progress: 2,
    assignment_tracking: 3,
    messaging_center: 2,
    school_calendar: 1
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const getSelectedChildName = () => {
    const childNames = {
      'child1': 'María González',
      'child2': 'Carlos González',
      'child3': 'Ana González'
    };
    return childNames?.[selectedChild] || 'María González';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedChild={selectedChild}
        onChildChange={handleChildChange}
        notificationCounts={notificationCounts}
      />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {getGreeting()}, Carmen
              </h1>
              <p className="text-muted-foreground">
                Aquí tienes un resumen del progreso académico de {getSelectedChildName()}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <MultiChildSelector
                selectedChild={selectedChild}
                onChildChange={handleChildChange}
                variant="compact"
              />
              
              <Button
                variant="default"
                onClick={() => navigate('/messaging-center')}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Mensajes
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats?.map((stat, index) => (
            <QuickStatsCard
              key={index}
              title={stat?.title}
              value={stat?.value}
              subtitle={stat?.subtitle}
              icon={stat?.icon}
              trend={stat?.trend}
              color={stat?.color}
              onClick={() => handleQuickAction(
                stat?.title?.includes('Promedio') ? 'grades' :
                stat?.title?.includes('Tareas') ? 'assignments' :
                stat?.title?.includes('Mensajes') ? 'messages' : 'calendar'
              )}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <RecentActivityCard
              activities={recentActivities?.slice(0, 5)}
              onViewAll={() => navigate('/academic-progress')}
            />
            
            <AnnouncementsCard
              announcements={announcements?.slice(0, 2)}
              onViewAll={() => navigate('/school-calendar')}
            />
          </div>

          {/* Right Column - Schedule & Notifications */}
          <div className="space-y-6">
            <TodayScheduleCard
              schedule={todaySchedule}
              onViewCalendar={() => navigate('/school-calendar')}
            />
            
            <NotificationCenter
              notifications={notifications?.slice(0, 5)}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/academic-progress')}
              className="flex flex-col items-center p-6 h-auto"
            >
              <Icon name="TrendingUp" size={24} className="mb-2 text-primary" />
              <span className="text-sm font-medium">Ver Progreso</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/assignment-tracking')}
              className="flex flex-col items-center p-6 h-auto"
            >
              <Icon name="BookOpen" size={24} className="mb-2 text-warning" />
              <span className="text-sm font-medium">Tareas</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/messaging-center')}
              className="flex flex-col items-center p-6 h-auto"
            >
              <Icon name="MessageCircle" size={24} className="mb-2 text-primary" />
              <span className="text-sm font-medium">Mensajes</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/school-calendar')}
              className="flex flex-col items-center p-6 h-auto"
            >
              <Icon name="Calendar" size={24} className="mb-2 text-secondary" />
              <span className="text-sm font-medium">Calendario</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;