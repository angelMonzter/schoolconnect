import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AssignmentFilters from './components/AssignmentFilters';
import AssignmentTable from './components/AssignmentTable';
import AssignmentCalendar from './components/AssignmentCalendar';
import AssignmentStats from './components/AssignmentStats';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AssignmentTracking = () => {
  const [selectedChild, setSelectedChild] = useState('child1');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const [showStats, setShowStats] = useState(false);

  // Mock assignments data
  const mockAssignments = [
    {
      id: 1,
      childId: 'child1',
      studentName: 'María González',
      subject: 'Matemáticas',
      title: 'Ejercicios de Fracciones',
      description: 'Resolver los ejercicios del capítulo 5 sobre fracciones equivalentes y operaciones básicas.',
      dueDate: '2025-01-13T23:59:00',
      status: 'pending',
      priority: 'high',
      instructions: `Completar los ejercicios 1-15 del libro de texto página 87.\nMostrar todo el procedimiento de resolución.\nUsar calculadora solo para verificar resultados.`,
      resources: [
        { name: 'Guía de Fracciones.pdf', type: 'pdf' },
        { name: 'Video Tutorial - Fracciones', type: 'video' }
      ],
      feedback: null,
      grade: null
    },
    {
      id: 2,
      childId: 'child1',
      studentName: 'María González',
      subject: 'Lengua Española',
      title: 'Ensayo sobre "El Quijote"',
      description: 'Escribir un ensayo de 500 palabras sobre los valores presentes en la obra de Cervantes.',
      dueDate: '2025-01-15T23:59:00',
      status: 'submitted',
      priority: 'medium',
      instructions: `Escribir un ensayo de 500 palabras sobre los valores morales en Don Quijote.\nIncluir introducción, desarrollo y conclusión.\nCitar al menos 3 ejemplos específicos de la obra.`,
      resources: [
        { name: 'Fragmentos seleccionados.pdf', type: 'pdf' }
      ],
      feedback: 'Excelente análisis de los valores. La estructura del ensayo es muy clara.',
      grade: 9
    },
    {
      id: 3,
      childId: 'child2',
      studentName: 'Carlos González',
      subject: 'Ciencias Naturales',
      title: 'Experimento del Ciclo del Agua',
      description: 'Realizar el experimento del ciclo del agua y documentar las observaciones.',
      dueDate: '2025-01-12T23:59:00',
      status: 'overdue',
      priority: 'high',
      instructions: `Seguir las instrucciones del manual de experimentos página 23.\nDocumentar cada fase del proceso con fotografías.\nEscribir un reporte de 2 páginas con conclusiones.`,
      resources: [
        { name: 'Manual de Experimentos.pdf', type: 'pdf' },
        { name: 'Plantilla de Reporte.docx', type: 'document' }
      ],
      feedback: null,
      grade: null
    },
    {
      id: 4,
      childId: 'child2',
      studentName: 'Carlos González',
      subject: 'Matemáticas',
      title: 'Tablas de Multiplicar',
      description: 'Practicar las tablas de multiplicar del 6 al 9 y completar la hoja de ejercicios.',
      dueDate: '2025-01-14T23:59:00',
      status: 'completed',
      priority: 'medium',
      instructions: `Memorizar las tablas del 6, 7, 8 y 9.\nCompletar la hoja de ejercicios sin ayuda.\nPracticar 15 minutos diarios.`,
      resources: [
        { name: 'Hoja de Ejercicios.pdf', type: 'pdf' }
      ],
      feedback: 'Muy buen trabajo. Se nota la práctica diaria.',
      grade: 8
    },
    {
      id: 5,
      childId: 'child3',
      studentName: 'Ana González',
      title: 'Lectura Comprensiva',
      subject: 'Lengua Española',
      description: 'Leer el cuento "La Tortuga y la Liebre" y responder las preguntas de comprensión.',
      dueDate: '2025-01-16T23:59:00',
      status: 'pending',
      priority: 'low',
      instructions: `Leer el cuento completo en voz alta.\nResponder las 10 preguntas de comprensión.\nDibujar la escena favorita del cuento.`,
      resources: [
        { name: 'Cuento - La Tortuga y la Liebre.pdf', type: 'pdf' },
        { name: 'Preguntas de Comprensión.pdf', type: 'pdf' }
      ],
      feedback: null,
      grade: null
    },
    {
      id: 6,
      childId: 'child1',
      studentName: 'María González',
      subject: 'Ciencias Sociales',
      title: 'Mapa de España',
      description: 'Completar el mapa político de España con todas las comunidades autónomas.',
      dueDate: '2025-01-18T23:59:00',
      status: 'pending',
      priority: 'medium',
      instructions: `Colorear cada comunidad autónoma con un color diferente.\nEscribir el nombre de cada comunidad y su capital.\nIncluir una leyenda con los colores utilizados.`,
      resources: [
        { name: 'Mapa en Blanco.pdf', type: 'pdf' },
        { name: 'Lista de Comunidades.pdf', type: 'pdf' }
      ],
      feedback: null,
      grade: null
    },
    {
      id: 7,
      childId: 'child2',
      studentName: 'Carlos González',
      subject: 'Inglés',
      title: 'Vocabulario de Animales',
      description: 'Aprender 20 nombres de animales en inglés y hacer dibujos representativos.',
      dueDate: '2025-01-17T23:59:00',
      status: 'graded',
      priority: 'low',
      instructions: `Memorizar la pronunciación de 20 animales.\nDibujar cada animal y escribir su nombre en inglés.\nGrabar un audio pronunciando cada palabra.`,
      resources: [
        { name: 'Lista de Animales.pdf', type: 'pdf' },
        { name: 'Audio de Pronunciación.mp3', type: 'audio' }
      ],
      feedback: 'Excelente pronunciación y creatividad en los dibujos.',
      grade: 10
    },
    {
      id: 8,
      childId: 'child3',
      studentName: 'Ana González',
      subject: 'Matemáticas',
      title: 'Sumas y Restas',
      description: 'Resolver 30 operaciones de sumas y restas con números de dos cifras.',
      dueDate: '2025-01-19T23:59:00',
      status: 'pending',
      priority: 'medium',
      instructions: `Resolver todas las operaciones mostrando el procedimiento.\nUsar material manipulativo si es necesario.\nRevisar los resultados dos veces.`,
      resources: [
        { name: 'Hoja de Operaciones.pdf', type: 'pdf' }
      ],
      feedback: null,
      grade: null
    }
  ];

  const [assignments] = useState(mockAssignments);
  const [filteredAssignments, setFilteredAssignments] = useState(mockAssignments);

  // Notification counts for header
  const notificationCounts = {
    assignment_tracking: assignments?.filter(a => 
      new Date(a.dueDate) < new Date() && a?.status === 'pending'
    )?.length
  };

  // Filter assignments based on selected filters
  useEffect(() => {
    let filtered = assignments;

    // Filter by child
    if (selectedChild !== 'all') {
      filtered = filtered?.filter(assignment => assignment?.childId === selectedChild);
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered?.filter(assignment => assignment?.subject === selectedSubject);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'overdue') {
        filtered = filtered?.filter(assignment => 
          new Date(assignment.dueDate) < new Date() && assignment?.status === 'pending'
        );
      } else {
        filtered = filtered?.filter(assignment => assignment?.status === selectedStatus);
      }
    }

    // Filter by date range
    if (selectedDateRange !== 'all') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow?.setDate(today?.getDate() + 1);
      const weekFromNow = new Date(today);
      weekFromNow?.setDate(today?.getDate() + 7);
      const monthFromNow = new Date(today);
      monthFromNow?.setMonth(today?.getMonth() + 1);

      switch (selectedDateRange) {
        case 'today':
          filtered = filtered?.filter(assignment => {
            const dueDate = new Date(assignment.dueDate);
            return dueDate?.toDateString() === today?.toDateString();
          });
          break;
        case 'week':
          filtered = filtered?.filter(assignment => {
            const dueDate = new Date(assignment.dueDate);
            return dueDate >= today && dueDate <= weekFromNow;
          });
          break;
        case 'month':
          filtered = filtered?.filter(assignment => {
            const dueDate = new Date(assignment.dueDate);
            return dueDate >= today && dueDate <= monthFromNow;
          });
          break;
        case 'overdue':
          filtered = filtered?.filter(assignment => 
            new Date(assignment.dueDate) < today && assignment?.status === 'pending'
          );
          break;
        default:
          break;
      }
    }

    setFilteredAssignments(filtered);
  }, [assignments, selectedChild, selectedSubject, selectedStatus, selectedDateRange]);

  const handleClearFilters = () => {
    setSelectedChild('all');
    setSelectedSubject('all');
    setSelectedStatus('all');
    setSelectedDateRange('all');
  };

  const handleAssignmentClick = (assignment) => {
    console.log('Opening assignment:', assignment);
    // Here you would typically navigate to assignment details or open a modal
  };

  const handleStatusUpdate = (assignmentId, newStatus) => {
    console.log('Updating assignment status:', assignmentId, newStatus);
    // Here you would typically update the assignment status in your state management
  };

  const handleDateSelect = (date, dayAssignments) => {
    console.log('Selected date:', date, 'Assignments:', dayAssignments);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/parent-dashboard', icon: 'Home' },
    { label: 'Seguimiento de Tareas', icon: 'BookOpen' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedChild={selectedChild}
        onChildChange={setSelectedChild}
        notificationCounts={notificationCounts}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Seguimiento de Tareas
            </h1>
            <p className="text-muted-foreground">
              Monitorea el progreso de las tareas y fechas límite de tus hijos
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 lg:mt-0">
            <Button
              variant={showStats ? 'default' : 'outline'}
              onClick={() => setShowStats(!showStats)}
              className="hidden md:flex"
            >
              <Icon name="BarChart3" size={16} className="mr-1" />
              {showStats ? 'Ocultar' : 'Ver'} Estadísticas
            </Button>
            
            <Button variant="outline">
              <Icon name="Download" size={16} className="mr-1" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        {showStats && (
          <div className="mb-6">
            <AssignmentStats 
              assignments={filteredAssignments}
              selectedChild={selectedChild}
            />
          </div>
        )}

        {/* Filters */}
        <AssignmentFilters
          selectedChild={selectedChild}
          onChildChange={setSelectedChild}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedDateRange={selectedDateRange}
          onDateRangeChange={setSelectedDateRange}
          onClearFilters={handleClearFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Content Area */}
        <div className="space-y-6">
          {viewMode === 'table' ? (
            <AssignmentTable
              assignments={filteredAssignments}
              onAssignmentClick={handleAssignmentClick}
              onStatusUpdate={handleStatusUpdate}
            />
          ) : (
            <AssignmentCalendar
              assignments={filteredAssignments}
              onAssignmentClick={handleAssignmentClick}
              onDateSelect={handleDateSelect}
            />
          )}
        </div>

        {/* Mobile Stats Toggle */}
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <Button
            variant={showStats ? 'default' : 'outline'}
            onClick={() => setShowStats(!showStats)}
            className="rounded-full w-12 h-12 p-0 shadow-lg"
          >
            <Icon name="BarChart3" size={20} />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AssignmentTracking;