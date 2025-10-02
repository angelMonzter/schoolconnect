import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MultiChildSelector from '../../components/ui/MultiChildSelector';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import SubjectTabs from './components/SubjectTabs';
import PerformanceChart from './components/PerformanceChart';
import PerformanceMetrics from './components/PerformanceMetrics';
import AssignmentTable from './components/AssignmentTable';
import FilterControls from './components/FilterControls';
import AssignmentDetailModal from './components/AssignmentDetailModal';

const AcademicProgress = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('child1');
  const [activeSubject, setActiveSubject] = useState('mathematics');
  const [chartType, setChartType] = useState('grades');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'current_year',
    assignmentType: 'all',
    status: 'all',
    gradeRange: 'all'
  });

  // Mock data for subjects
  const subjects = [
    { id: 'mathematics', name: 'Matemáticas', hasNewGrades: true },
    { id: 'spanish', name: 'Lengua Española', hasNewGrades: false },
    { id: 'science', name: 'Ciencias Naturales', hasNewGrades: true },
    { id: 'history', name: 'Historia', hasNewGrades: false },
    { id: 'english', name: 'Inglés', hasNewGrades: false },
    { id: 'art', name: 'Educación Artística', hasNewGrades: false }
  ];

  // Mock data for performance metrics
  const performanceMetrics = {
    averageGrade: 8.2,
    completionRate: 87,
    completedAssignments: 26,
    totalAssignments: 30,
    classRank: 8,
    totalStudents: 25,
    trend: 0.3
  };

  // Mock data for grade trends
  const gradeData = [
    { period: 'Sep', grade: 7.8, classAverage: 7.2 },
    { period: 'Oct', grade: 8.1, classAverage: 7.4 },
    { period: 'Nov', grade: 8.3, classAverage: 7.6 },
    { period: 'Dic', grade: 8.0, classAverage: 7.5 },
    { period: 'Ene', grade: 8.4, classAverage: 7.8 },
    { period: 'Feb', grade: 8.2, classAverage: 7.7 }
  ];

  // Mock data for completion rates
  const completionData = [
    { period: 'Sep', completionRate: 85 },
    { period: 'Oct', completionRate: 90 },
    { period: 'Nov', completionRate: 88 },
    { period: 'Dic', completionRate: 82 },
    { period: 'Ene', completionRate: 92 },
    { period: 'Feb', completionRate: 87 }
  ];

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: 'Ecuaciones de Segundo Grado',
      type: 'Tarea',
      subject: 'Matemáticas',
      dueDate: '2025-01-15T23:59:00',
      submittedDate: '2025-01-14T18:30:00',
      gradedDate: '2025-01-16T10:15:00',
      status: 'completed',
      grade: 9.2,
      teacherName: 'Prof. García',
      teacherComment: `Excelente trabajo. María demostró una comprensión sólida de los conceptos y aplicó correctamente las fórmulas. \n\nSugerencia: Practicar más problemas con discriminante negativo.`,
      description: `Resolver los siguientes ejercicios sobre ecuaciones de segundo grado:\n\n1. Encontrar las raíces de x² - 5x + 6 = 0\n2. Determinar el discriminante de 2x² + 3x - 1 = 0\n3. Resolver problemas de aplicación práctica`,
      attachments: [
        { name: 'ejercicios_ecuaciones.pdf', size: '245 KB' },
        { name: 'solucionario.pdf', size: '180 KB' }
      ],
      rubric: [
        { name: 'Procedimiento correcto', weight: 40, score: 9.0 },
        { name: 'Resultado final', weight: 35, score: 9.5 },
        { name: 'Presentación', weight: 25, score: 9.0 }
      ]
    },
    {
      id: 2,
      title: 'Análisis de Funciones Lineales',
      type: 'Examen',
      subject: 'Matemáticas',
      dueDate: '2025-01-10T14:00:00',
      submittedDate: '2025-01-10T13:45:00',
      gradedDate: '2025-01-12T09:30:00',
      status: 'completed',
      grade: 8.7,
      teacherName: 'Prof. García',
      teacherComment: 'Buen dominio de los conceptos. Pequeños errores en el cálculo de pendientes.',
      description: 'Examen sobre funciones lineales, pendientes y ecuaciones de la recta.',
      attachments: []
    },
    {
      id: 3,
      title: 'Proyecto de Geometría',
      type: 'Proyecto',
      subject: 'Matemáticas',
      dueDate: '2025-01-20T23:59:00',
      submittedDate: null,
      gradedDate: null,
      status: 'pending',
      grade: null,
      teacherName: 'Prof. García',
      teacherComment: null,
      description: 'Crear un modelo 3D de figuras geométricas y calcular sus volúmenes.',
      attachments: [
        { name: 'instrucciones_proyecto.pdf', size: '320 KB' }
      ]
    },
    {
      id: 4,
      title: 'Tarea de Fracciones',
      type: 'Tarea',
      subject: 'Matemáticas',
      dueDate: '2025-01-08T23:59:00',
      submittedDate: '2025-01-09T08:15:00',
      gradedDate: '2025-01-10T11:20:00',
      status: 'late',
      grade: 7.5,
      teacherName: 'Prof. García',
      teacherComment: 'Entregada un día tarde. Contenido correcto pero penalización por retraso.',
      description: 'Ejercicios de suma, resta, multiplicación y división de fracciones.',
      attachments: []
    },
    {
      id: 5,
      title: 'Quiz de Álgebra Básica',
      type: 'Cuestionario',
      subject: 'Matemáticas',
      dueDate: '2025-01-05T23:59:00',
      submittedDate: null,
      gradedDate: null,
      status: 'missing',
      grade: null,
      teacherName: 'Prof. García',
      teacherComment: null,
      description: 'Cuestionario online sobre conceptos básicos de álgebra.',
      attachments: []
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/parent-dashboard', icon: 'Home' },
    { label: 'Progreso Académico', icon: 'TrendingUp' }
  ];

  const notificationCounts = {
    parent_dashboard: 2,
    academic_progress: 0,
    assignment_tracking: 5,
    school_calendar: 1,
    messaging_center: 3
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: 'current_year',
      assignmentType: 'all',
      status: 'all',
      gradeRange: 'all'
    });
  };

  const handleExportReport = () => {
    // Mock export functionality
    const reportData = {
      child: selectedChild,
      subject: activeSubject,
      period: filters?.dateRange,
      generatedAt: new Date()?.toISOString()
    };
    
    console.log('Exporting report:', reportData);
    
    // Simulate download
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_academico_${selectedChild}_${activeSubject}_${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewAssignmentDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleContactTeacher = (teacherName) => {
    navigate('/messaging-center', { 
      state: { 
        recipient: teacherName,
        subject: `Consulta sobre ${selectedAssignment?.title}` 
      } 
    });
  };

  const getCurrentSubjectName = () => {
    return subjects?.find(s => s?.id === activeSubject)?.name || 'Materia';
  };

  // Filter assignments based on current filters
  const filteredAssignments = assignments?.filter(assignment => {
    if (filters?.assignmentType !== 'all' && assignment?.type?.toLowerCase() !== filters?.assignmentType) {
      return false;
    }
    if (filters?.status !== 'all' && assignment?.status !== filters?.status) {
      return false;
    }
    if (filters?.gradeRange !== 'all') {
      if (filters?.gradeRange === 'ungraded' && assignment?.grade !== null) return false;
      if (filters?.gradeRange === 'excellent' && (assignment?.grade === null || assignment?.grade < 9)) return false;
      if (filters?.gradeRange === 'good' && (assignment?.grade === null || assignment?.grade < 7 || assignment?.grade >= 9)) return false;
      if (filters?.gradeRange === 'satisfactory' && (assignment?.grade === null || assignment?.grade < 6 || assignment?.grade >= 7)) return false;
      if (filters?.gradeRange === 'needs_improvement' && (assignment?.grade === null || assignment?.grade >= 6)) return false;
    }
    return true;
  });

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Progreso Académico</h1>
            <p className="text-muted-foreground">
              Monitoreo detallado del rendimiento académico y análisis de tendencias
            </p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <MultiChildSelector
              selectedChild={selectedChild}
              onChildChange={setSelectedChild}
              variant="compact"
              className="sm:min-w-[200px]"
            />
            <Button
              variant="outline"
              onClick={() => navigate('/assignment-tracking')}
              iconName="BookOpen"
              iconSize={16}
            >
              Ver Tareas
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics metrics={performanceMetrics} />

        {/* Subject Tabs */}
        <SubjectTabs 
          subjects={subjects}
          activeSubject={activeSubject}
          onSubjectChange={setActiveSubject}
        />

        {/* Chart Controls */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-foreground">
              Análisis de Rendimiento - {getCurrentSubjectName()}
            </h3>
            <div className="flex space-x-2">
              <Button
                variant={chartType === 'grades' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('grades')}
                iconName="TrendingUp"
                iconSize={16}
              >
                Calificaciones
              </Button>
              <Button
                variant={chartType === 'completion' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('completion')}
                iconName="CheckCircle"
                iconSize={16}
              >
                Completitud
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="mb-6">
          <PerformanceChart 
            data={chartType === 'grades' ? gradeData : completionData}
            chartType={chartType}
            subject={getCurrentSubjectName()}
          />
        </div>

        {/* Filter Controls */}
        <FilterControls
          filters={filters}
          onFilterChange={handleFilterChange}
          onExportReport={handleExportReport}
          onResetFilters={handleResetFilters}
        />

        {/* Assignment Table */}
        <AssignmentTable 
          assignments={filteredAssignments}
          onViewDetails={handleViewAssignmentDetails}
        />

        {/* Quick Actions */}
        <div className="mt-8 bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/messaging-center')}
              className="justify-start p-4 h-auto"
            >
              <div className="flex items-center space-x-3">
                <Icon name="MessageCircle" size={20} className="text-primary" />
                <div className="text-left">
                  <p className="font-medium">Contactar Profesores</p>
                  <p className="text-sm text-muted-foreground">Enviar mensajes sobre el progreso</p>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/school-calendar')}
              className="justify-start p-4 h-auto"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={20} className="text-secondary" />
                <div className="text-left">
                  <p className="font-medium">Ver Calendario</p>
                  <p className="text-sm text-muted-foreground">Fechas de exámenes y entregas</p>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={handleExportReport}
              className="justify-start p-4 h-auto"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Download" size={20} className="text-accent" />
                <div className="text-left">
                  <p className="font-medium">Descargar Reporte</p>
                  <p className="text-sm text-muted-foreground">Reporte completo de progreso</p>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </main>

      {/* Assignment Detail Modal */}
      <AssignmentDetailModal
        assignment={selectedAssignment}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAssignment(null);
        }}
        onContactTeacher={handleContactTeacher}
      />
    </div>
  );
};

export default AcademicProgress;