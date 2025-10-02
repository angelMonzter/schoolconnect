import React from 'react';
import Icon from '../../../components/AppIcon';

const CalendarLegend = ({ isVisible, onToggle }) => {
  const eventTypes = [
    { 
      type: 'academic', 
      label: 'Eventos Académicos', 
      icon: 'BookOpen', 
      color: 'bg-primary',
      description: 'Fechas de exámenes, entregas de proyectos, inicio/fin de períodos'
    },
    { 
      type: 'holiday', 
      label: 'Vacaciones y Feriados', 
      icon: 'Sun', 
      color: 'bg-success',
      description: 'Días festivos, vacaciones escolares, días no lectivos'
    },
    { 
      type: 'conference', 
      label: 'Conferencias de Padres', 
      icon: 'Users', 
      color: 'bg-warning',
      description: 'Reuniones con profesores, juntas de padres de familia'
    },
    { 
      type: 'activity', 
      label: 'Actividades Extracurriculares', 
      icon: 'Zap', 
      color: 'bg-secondary',
      description: 'Deportes, clubes, eventos culturales, excursiones'
    },
    { 
      type: 'exam', 
      label: 'Exámenes y Evaluaciones', 
      icon: 'FileText', 
      color: 'bg-error',
      description: 'Exámenes parciales, finales, evaluaciones importantes'
    },
    { 
      type: 'meeting', 
      label: 'Reuniones Escolares', 
      icon: 'MessageCircle', 
      color: 'bg-accent',
      description: 'Asambleas, reuniones administrativas, eventos especiales'
    }
  ];

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-floating">
        <button
          onClick={onToggle}
          className="bg-card border border-border rounded-full p-3 shadow-elevation-2 hover:shadow-elevation-3 transition-shadow"
          title="Mostrar leyenda"
        >
          <Icon name="Info" size={20} className="text-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-floating max-w-sm">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Leyenda del Calendario</h3>
          <button
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {eventTypes?.map((eventType) => (
            <div key={eventType?.type} className="flex items-start space-x-3">
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${eventType?.color}`} />
                <Icon name={eventType?.icon} size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">
                  {eventType?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {eventType?.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Info" size={12} />
            <span>Haz clic en cualquier evento para ver más detalles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarLegend;