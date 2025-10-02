import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentTable = ({ assignments, onViewDetails }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'desc' });

  const getGradeColor = (grade) => {
    if (grade >= 8) return 'text-success bg-success/10';
    if (grade >= 6) return 'text-warning bg-warning/10';
    if (grade < 6) return 'text-error bg-error/10';
    return 'text-muted-foreground bg-muted';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'late':
        return 'text-error bg-error/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'missing':
        return 'text-error bg-error/20';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'late':
        return 'Entregada tarde';
      case 'pending':
        return 'Pendiente';
      case 'missing':
        return 'No entregada';
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'late':
        return 'Clock';
      case 'pending':
        return 'AlertCircle';
      case 'missing':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAssignments = [...assignments]?.sort((a, b) => {
    if (sortConfig?.key === 'dueDate') {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortConfig?.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (sortConfig?.key === 'grade') {
      const gradeA = a?.grade || 0;
      const gradeB = b?.grade || 0;
      return sortConfig?.direction === 'asc' ? gradeA - gradeB : gradeB - gradeA;
    }
    if (sortConfig?.key === 'title') {
      return sortConfig?.direction === 'asc' 
        ? a?.title?.localeCompare(b?.title)
        : b?.title?.localeCompare(a?.title);
    }
    return 0;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Registro Detallado de Tareas</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Historial completo de asignaciones y calificaciones
        </p>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('title')}
                  className="p-0 h-auto font-semibold text-sm text-foreground hover:text-primary"
                >
                  Tarea
                  <Icon 
                    name={sortConfig?.key === 'title' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="px-6 py-3 text-left">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('dueDate')}
                  className="p-0 h-auto font-semibold text-sm text-foreground hover:text-primary"
                >
                  Fecha Entrega
                  <Icon 
                    name={sortConfig?.key === 'dueDate' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="px-6 py-3 text-left">Estado</th>
              <th className="px-6 py-3 text-left">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('grade')}
                  className="p-0 h-auto font-semibold text-sm text-foreground hover:text-primary"
                >
                  Calificación
                  <Icon 
                    name={sortConfig?.key === 'grade' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="px-6 py-3 text-left">Comentarios</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedAssignments?.map((assignment) => (
              <tr key={assignment?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{assignment?.title}</p>
                    <p className="text-sm text-muted-foreground">{assignment?.type}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-foreground">{formatDate(assignment?.dueDate)}</p>
                    {assignment?.submittedDate && (
                      <p className="text-muted-foreground">
                        Entregada: {formatDate(assignment?.submittedDate)}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment?.status)}`}>
                    <Icon name={getStatusIcon(assignment?.status)} size={12} className="mr-1" />
                    {getStatusText(assignment?.status)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {assignment?.grade !== null ? (
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-bold ${getGradeColor(assignment?.grade)}`}>
                      {assignment?.grade}/10
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Sin calificar</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {assignment?.teacherComment ? (
                    <div className="max-w-xs">
                      <p className="text-sm text-foreground truncate" title={assignment?.teacherComment}>
                        {assignment?.teacherComment}
                      </p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Sin comentarios</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(assignment)}
                    iconName="Eye"
                    iconSize={16}
                  >
                    Ver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {sortedAssignments?.map((assignment) => (
          <div key={assignment?.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{assignment?.title}</h4>
                <p className="text-sm text-muted-foreground">{assignment?.type}</p>
              </div>
              {assignment?.grade !== null && (
                <div className={`px-2 py-1 rounded-full text-sm font-bold ${getGradeColor(assignment?.grade)}`}>
                  {assignment?.grade}/10
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-muted-foreground">Entrega: {formatDate(assignment?.dueDate)}</p>
                {assignment?.submittedDate && (
                  <p className="text-muted-foreground">
                    Enviada: {formatDate(assignment?.submittedDate)}
                  </p>
                )}
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment?.status)}`}>
                <Icon name={getStatusIcon(assignment?.status)} size={12} className="mr-1" />
                {getStatusText(assignment?.status)}
              </div>
            </div>

            {assignment?.teacherComment && (
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm text-foreground">{assignment?.teacherComment}</p>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(assignment)}
                iconName="Eye"
                iconSize={16}
              >
                Ver Detalles
              </Button>
            </div>
          </div>
        ))}
      </div>
      {sortedAssignments?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="BookOpen" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No hay tareas registradas</h3>
          <p className="text-muted-foreground">
            Las tareas aparecerán aquí una vez que los profesores las publiquen.
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignmentTable;