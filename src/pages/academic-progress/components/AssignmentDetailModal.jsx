import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentDetailModal = ({ assignment, isOpen, onClose, onContactTeacher }) => {
  if (!isOpen || !assignment) return null;

  const getGradeColor = (grade) => {
    if (grade >= 8) return 'text-success bg-success/10 border-success/20';
    if (grade >= 6) return 'text-warning bg-warning/10 border-warning/20';
    if (grade < 6) return 'text-error bg-error/10 border-error/20';
    return 'text-muted-foreground bg-muted border-border';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'late':
        return 'text-error bg-error/10 border-error/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'missing':
        return 'text-error bg-error/20 border-error/30';
      default:
        return 'text-muted-foreground bg-muted border-border';
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{assignment?.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{assignment?.subject} • {assignment?.type}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Grade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border ${getStatusColor(assignment?.status)}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={20} />
                <span className="font-medium">Estado</span>
              </div>
              <p className="text-lg font-semibold">{getStatusText(assignment?.status)}</p>
            </div>

            <div className={`p-4 rounded-lg border ${assignment?.grade !== null ? getGradeColor(assignment?.grade) : 'bg-muted border-border'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Award" size={20} />
                <span className="font-medium">Calificación</span>
              </div>
              <p className="text-lg font-semibold">
                {assignment?.grade !== null ? `${assignment?.grade}/10` : 'Sin calificar'}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="Calendar" size={20} className="text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Fecha de entrega</p>
                <p className="text-muted-foreground">{formatDate(assignment?.dueDate)}</p>
              </div>
            </div>

            {assignment?.submittedDate && (
              <div className="flex items-start space-x-3">
                <Icon name="Upload" size={20} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Fecha de envío</p>
                  <p className="text-muted-foreground">{formatDate(assignment?.submittedDate)}</p>
                </div>
              </div>
            )}

            {assignment?.gradedDate && (
              <div className="flex items-start space-x-3">
                <Icon name="CheckSquare" size={20} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Fecha de calificación</p>
                  <p className="text-muted-foreground">{formatDate(assignment?.gradedDate)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {assignment?.description && (
            <div>
              <h3 className="font-medium text-foreground mb-2 flex items-center">
                <Icon name="FileText" size={20} className="mr-2" />
                Descripción
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap">{assignment?.description}</p>
              </div>
            </div>
          )}

          {/* Teacher Comments */}
          {assignment?.teacherComment && (
            <div>
              <h3 className="font-medium text-foreground mb-2 flex items-center">
                <Icon name="MessageSquare" size={20} className="mr-2" />
                Comentarios del Profesor
              </h3>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{assignment?.teacherName}</p>
                    <p className="text-foreground mt-1">{assignment?.teacherComment}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attachments */}
          {assignment?.attachments && assignment?.attachments?.length > 0 && (
            <div>
              <h3 className="font-medium text-foreground mb-2 flex items-center">
                <Icon name="Paperclip" size={20} className="mr-2" />
                Archivos Adjuntos
              </h3>
              <div className="space-y-2">
                {assignment?.attachments?.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="File" size={20} className="text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{attachment?.name}</p>
                        <p className="text-sm text-muted-foreground">{attachment?.size}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      iconSize={16}
                    >
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rubric or Criteria */}
          {assignment?.rubric && (
            <div>
              <h3 className="font-medium text-foreground mb-2 flex items-center">
                <Icon name="List" size={20} className="mr-2" />
                Criterios de Evaluación
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="space-y-3">
                  {assignment?.rubric?.map((criterion, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-foreground">{criterion?.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{criterion?.weight}%</span>
                        {criterion?.score && (
                          <span className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(criterion?.score)}`}>
                            {criterion?.score}/10
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-muted-foreground">
            <Icon name="User" size={16} className="inline mr-1" />
            Profesor: {assignment?.teacherName}
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onContactTeacher(assignment?.teacherName)}
              iconName="MessageCircle"
              iconSize={16}
            >
              Contactar Profesor
            </Button>
            <Button
              variant="default"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailModal;