import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import EventSidebar from './components/EventSidebar';
import EventModal from './components/EventModal';
import CalendarLegend from './components/CalendarLegend';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SchoolCalendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedChild, setSelectedChild] = useState('child1');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLegendVisible, setIsLegendVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState(['all']);

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Examen de Matemáticas - 5° Grado",
      type: "exam",
      date: new Date(2025, 8, 15, 9, 0),
      endDate: new Date(2025, 8, 15, 11, 0),
      location: "Aula 205",
      description: `Examen parcial de matemáticas que incluye:\n• Fracciones y decimales\n• Geometría básica\n• Problemas de aplicación\n\nMaterial permitido: calculadora básica, regla y compás.`,
      organizer: "Prof. Ana Martínez",
      requiresRsvp: false,
      attendees: ["María González"],
      childrenAffected: ["child1"]
    },
    {
      id: 2,
      title: "Reunión de Padres - 3° Grado",
      type: "conference",
      date: new Date(2025, 8, 18, 16, 0),
      endDate: new Date(2025, 8, 18, 18, 0),
      location: "Aula 103",
      description: `Reunión trimestral con los padres de familia para revisar:\n• Progreso académico del trimestre\n• Actividades extracurriculares\n• Próximos eventos escolares\n• Dudas y sugerencias`,
      organizer: "Prof. Carlos Rodríguez",
      requiresRsvp: true,
      rsvpStatus: "pending",
      attendees: ["Padres de 3° Grado"],
      childrenAffected: ["child2"]
    },
    {
      id: 3,
      title: "Día del Estudiante",
      type: "holiday",
      date: new Date(2025, 8, 21, 0, 0),
      location: "Toda la escuela",
      description: `Celebración del Día del Estudiante con actividades especiales:\n• Festival de talentos\n• Juegos deportivos\n• Concursos académicos\n• Almuerzo especial\n\nNo hay clases regulares este día.`,
      organizer: "Dirección Académica",
      requiresRsvp: false,
      childrenAffected: ["child1", "child2", "child3"]
    },
    {
      id: 4,
      title: "Torneo de Fútbol Interescolar",
      type: "activity",
      date: new Date(2025, 8, 25, 14, 0),
      endDate: new Date(2025, 8, 25, 17, 0),
      location: "Campo deportivo",
      description: `Torneo de fútbol entre escuelas del distrito:\n• Categorías: Sub-12 y Sub-15\n• Equipos participantes: 8 escuelas\n• Premiación al final del evento\n\nSe requiere autorización de padres para participar.`,
      organizer: "Depto. de Educación Física",
      requiresRsvp: true,
      rsvpStatus: "confirmed",
      attendees: ["Equipos de fútbol"],
      childrenAffected: ["child2"]
    },
    {
      id: 5,
      title: "Entrega de Proyecto de Ciencias",
      type: "academic",
      date: new Date(2025, 8, 28, 8, 0),
      location: "Laboratorio de Ciencias",
      description: `Fecha límite para la entrega del proyecto de ciencias naturales:\n• Tema: Ecosistemas locales\n• Formato: Maqueta + informe escrito\n• Presentación oral de 5 minutos\n• Valor: 25% de la calificación final`,
      organizer: "Prof. Laura Fernández",
      requiresRsvp: false,
      attendees: ["Estudiantes de 5° Grado"],
      childrenAffected: ["child1"]
    },
    {
      id: 6,
      title: "Taller de Lectura para Padres",
      type: "meeting",
      date: new Date(2025, 8, 30, 18, 0),
      endDate: new Date(2025, 8, 30, 20, 0),
      location: "Biblioteca escolar",
      description: `Taller dirigido a padres de familia sobre:\n• Técnicas de lectura en casa\n• Selección de libros apropiados\n• Creación de hábitos de lectura\n• Recursos digitales disponibles\n\nIncluye material didáctico gratuito.`,
      organizer: "Coordinación Académica",
      requiresRsvp: true,
      rsvpStatus: "pending",
      attendees: ["Padres de familia"],
      childrenAffected: ["child1", "child2", "child3"]
    },
    {
      id: 7,
      title: "Vacaciones de Otoño",
      type: "holiday",
      date: new Date(2025, 9, 12, 0, 0),
      endDate: new Date(2025, 9, 16, 23, 59),
      location: "N/A",
      description: `Período de vacaciones de otoño:\n• Inicio: 12 de octubre\n• Regreso a clases: 17 de octubre\n• No hay actividades escolares\n• Oficinas administrativas cerradas`,
      organizer: "Dirección General",
      requiresRsvp: false,
      childrenAffected: ["child1", "child2", "child3"]
    },
    {
      id: 8,
      title: "Festival de Arte y Cultura",
      type: "activity",
      date: new Date(2025, 9, 20, 15, 0),
      endDate: new Date(2025, 9, 20, 19, 0),
      location: "Auditorio principal",
      description: `Festival anual de arte y cultura con:\n• Exposición de trabajos estudiantiles\n• Presentaciones musicales\n• Obras de teatro\n• Danza folklórica\n• Venta de comida típica\n\nEntrada libre para toda la familia.`,
      organizer: "Depto. de Artes",
      requiresRsvp: false,
      attendees: ["Toda la comunidad escolar"],
      childrenAffected: ["child1", "child2", "child3"]
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/parent-dashboard', icon: 'Home' },
    { label: 'Calendario Escolar', icon: 'Calendar' }
  ];

  // Filter events based on selected child and active filters
  const filteredEvents = mockEvents?.filter(event => {
    const childFilter = selectedChild === 'all' || event?.childrenAffected?.includes(selectedChild);
    const typeFilter = activeFilters?.includes('all') || activeFilters?.includes(event?.type);
    return childFilter && typeFilter;
  });

  // Get upcoming events (next 30 days)
  const upcomingEvents = filteredEvents?.filter(event => new Date(event.date) >= new Date())?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 10);

  const handlePreviousPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate?.setMonth(currentDate?.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate?.setDate(currentDate?.getDate() - 7);
    } else {
      newDate?.setDate(currentDate?.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate?.setMonth(currentDate?.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate?.setDate(currentDate?.getDate() + 7);
    } else {
      newDate?.setDate(currentDate?.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleDateClick = (date) => {
    setCurrentDate(date);
    if (viewMode !== 'day') {
      setViewMode('day');
    }
  };

  const handleFilterChange = (filterType) => {
    if (filterType === 'all') {
      setActiveFilters(['all']);
    } else {
      const newFilters = activeFilters?.includes('all') 
        ? [filterType]
        : activeFilters?.includes(filterType)
        ? activeFilters?.filter(f => f !== filterType)
        : [...activeFilters?.filter(f => f !== 'all'), filterType];
      
      setActiveFilters(newFilters?.length === 0 ? ['all'] : newFilters);
    }
  };

  const handleRsvp = async (eventId, status) => {
    // Mock RSVP update
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`RSVP updated for event ${eventId}: ${status}`);
        resolve();
      }, 1000);
    });
  };

  // Notification counts for header
  const notificationCounts = {
    parent_dashboard: 2,
    academic_progress: 1,
    assignment_tracking: 5,
    school_calendar: upcomingEvents?.filter(e => e?.requiresRsvp && e?.rsvpStatus === 'pending')?.length,
    messaging_center: 3
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedChild={selectedChild}
        onChildChange={setSelectedChild}
        notificationCounts={notificationCounts}
      />
      
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Calendario Escolar
              </h1>
              <p className="text-muted-foreground">
                Mantente al día con todos los eventos, fechas importantes y actividades escolares
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLegendVisible(!isLegendVisible)}
              >
                <Icon name="Info" size={16} className="mr-2" />
                Leyenda
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/assignment-tracking')}
              >
                <Icon name="BookOpen" size={16} className="mr-2" />
                Ver Tareas
              </Button>
            </div>
          </div>
        </div>

        <CalendarHeader
          currentDate={currentDate}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onPrevious={handlePreviousPeriod}
          onNext={handleNextPeriod}
          onToday={handleToday}
          selectedChild={selectedChild}
          onChildChange={setSelectedChild}
        />

        <div className="flex gap-6">
          <CalendarGrid
            currentDate={currentDate}
            viewMode={viewMode}
            events={filteredEvents}
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
          />

          <EventSidebar
            upcomingEvents={upcomingEvents}
            onEventClick={handleEventClick}
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        <EventModal
          event={selectedEvent}
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            setSelectedEvent(null);
          }}
          onRsvp={handleRsvp}
        />

        <CalendarLegend
          isVisible={isLegendVisible}
          onToggle={() => setIsLegendVisible(!isLegendVisible)}
        />
      </main>
    </div>
  );
};

export default SchoolCalendar;