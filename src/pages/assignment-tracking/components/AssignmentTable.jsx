import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AssignmentTable = ({ assignments, onAssignmentClick, onStatusUpdate }) => {
  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedRows, setExpandedRows] = useState(new Set());

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'submitted':
        return 'text-primary bg-primary/10';
      case 'graded':
        return 'text-secondary bg-secondary/10';
      case 'overdue':
        return 'text-error bg-error/10';
      case 'pending':
      default:
        return 'text-warning bg-warning/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'submitted':
        return 'Upload';
      case 'graded':
        return 'Star';
      case 'overdue':
        return 'AlertTriangle';
      case 'pending':
      default:
        return 'Clock';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'submitted':
        return 'Entregada';
      case 'graded':
        return 'Calificada';
      case 'overdue':
        return 'Atrasada';
      case 'pending':
      default:
        return 'Pendiente';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
      default:
        return 'text-muted-foreground';
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleRowExpansion = (assignmentId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(assignmentId)) {
      newExpanded?.delete(assignmentId);
    } else {
      newExpanded?.add(assignmentId);
    }
    setExpandedRows(newExpanded);
  };

  const sortedAssignments = [...assignments]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'dueDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (dueDate, status) => {
    return new Date(dueDate) < new Date() && status === 'pending';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('subject')}
                  className="p-0 h-auto font-medium hover:text-primary"
                >
                  Materia
                  <Icon 
                    name={sortField === 'subject' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('title')}
                  className="p-0 h-auto font-medium hover:text-primary"
                >
                  Tarea
                  <Icon 
                    name={sortField === 'title' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('dueDate')}
                  className="p-0 h-auto font-medium hover:text-primary"
                >
                  Fecha Límite
                  <Icon 
                    name={sortField === 'dueDate' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Estado</th>
              <th className="text-left p-4 font-medium text-foreground">Estudiante</th>
              <th className="text-center p-4 font-medium text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssignments?.map((assignment) => (
              <React.Fragment key={assignment?.id}>
                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(assignment?.priority)}`} 
                           style={{ backgroundColor: 'currentColor' }} />
                      <span className="font-medium text-foreground">{assignment?.subject}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{assignment?.title}</div>
                      {assignment?.description && (
                        <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {assignment?.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`${isOverdue(assignment?.dueDate, assignment?.status) ? 'text-error' : 'text-foreground'}`}>
                      <div className="font-medium">{formatDate(assignment?.dueDate)}</div>
                      <div className="text-sm text-muted-foreground">{formatTime(assignment?.dueDate)}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment?.status)}`}>
                      <Icon name={getStatusIcon(assignment?.status)} size={12} className="mr-1" />
                      {getStatusLabel(assignment?.status)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">{assignment?.studentName}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(assignment?.id)}
                        title="Ver detalles"
                      >
                        <Icon name={expandedRows?.has(assignment?.id) ? "ChevronUp" : "ChevronDown"} size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAssignmentClick(assignment)}
                        title="Abrir tarea"
                      >
                        <Icon name="ExternalLink" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Row Details */}
                {expandedRows?.has(assignment?.id) && (
                  <tr className="bg-muted/20">
                    <td colSpan="6" className="p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Instrucciones</h4>
                            <p className="text-sm text-muted-foreground">
                              {assignment?.instructions || "No hay instrucciones específicas disponibles."}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Recursos</h4>
                            {assignment?.resources && assignment?.resources?.length > 0 ? (
                              <div className="space-y-1">
                                {assignment?.resources?.map((resource, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-sm">
                                    <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                                    <span className="text-primary hover:underline cursor-pointer">
                                      {resource?.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No hay recursos adjuntos.</p>
                            )}
                          </div>
                        </div>
                        
                        {assignment?.feedback && (
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Comentarios del Profesor</h4>
                            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                              {assignment?.feedback}
                            </p>
                          </div>
                        )}
                        
                        {assignment?.grade && (
                          <div className="flex items-center space-x-4">
                            <div>
                              <span className="text-sm text-muted-foreground">Calificación:</span>
                              <span className="ml-2 font-medium text-lg text-foreground">
                                {assignment?.grade}/10
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedAssignments?.map((assignment) => (
          <div key={assignment?.id} className="bg-muted/20 border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(assignment?.priority)}`} 
                       style={{ backgroundColor: 'currentColor' }} />
                  <span className="font-medium text-sm text-muted-foreground">{assignment?.subject}</span>
                </div>
                <h3 className="font-medium text-foreground">{assignment?.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{assignment?.studentName}</p>
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment?.status)}`}>
                <Icon name={getStatusIcon(assignment?.status)} size={12} className="mr-1" />
                {getStatusLabel(assignment?.status)}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className={`text-sm ${isOverdue(assignment?.dueDate, assignment?.status) ? 'text-error' : 'text-muted-foreground'}`}>
                <Icon name="Calendar" size={14} className="inline mr-1" />
                {formatDate(assignment?.dueDate)} - {formatTime(assignment?.dueDate)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAssignmentClick(assignment)}
              >
                <Icon name="ExternalLink" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {assignments?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="BookOpen" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="font-medium text-foreground mb-2">No hay tareas disponibles</h3>
          <p className="text-muted-foreground">
            No se encontraron tareas con los filtros seleccionados.
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignmentTable;