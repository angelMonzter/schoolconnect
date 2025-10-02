import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EventSidebar = ({ 
  upcomingEvents, 
  onEventClick, 
  onFilterChange, 
  activeFilters,
  isCollapsed,
  onToggleCollapse 
}) => {
  const eventTypes = [
    { value: 'all', label: 'Todos los eventos', icon: 'Calendar', color: 'text-foreground' },
    { value: 'academic', label: 'Académicos', icon: 'BookOpen', color: 'text-primary' },
    { value: 'holiday', label: 'Vacaciones', icon: 'Sun', color: 'text-success' },
    { value: 'conference', label: 'Conferencias', icon: 'Users', color: 'text-warning' },
    { value: 'activity', label: 'Actividades', icon: 'Zap', color: 'text-secondary' },
    { value: 'exam', label: 'Exámenes', icon: 'FileText', color: 'text-error' },
    { value: 'meeting', label: 'Reuniones', icon: 'MessageCircle', color: 'text-accent' }
  ];

  const getEventTypeColor = (type) => {
    const colors = {
      'academic': 'border-l-primary bg-primary/5',
      'holiday': 'border-l-success bg-success/5',
      'conference': 'border-l-warning bg-warning/5',
      'activity': 'border-l-secondary bg-secondary/5',
      'exam': 'border-l-error bg-error/5',
      'meeting': 'border-l-accent bg-accent/5'
    };
    return colors?.[type] || 'border-l-muted bg-muted/5';
  };

  const formatEventDate = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(today?.getDate() + 1);

    if (eventDate?.toDateString() === today?.toDateString()) {
      return 'Hoy';
    } else if (eventDate?.toDateString() === tomorrow?.toDateString()) {
      return 'Mañana';
    } else {
      return eventDate?.toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatEventTime = (date) => {
    return new Date(date)?.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border border-border rounded-lg p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="w-full h-10 p-0"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Eventos</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="w-8 h-8 p-0"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
      </div>
      {/* Filters */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Filtrar por tipo</h4>
        <div className="space-y-2">
          {eventTypes?.map((type) => (
            <Button
              key={type?.value}
              variant={activeFilters?.includes(type?.value) ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(type?.value)}
              className="w-full justify-start"
            >
              <Icon name={type?.icon} size={16} className={`mr-2 ${type?.color}`} />
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Upcoming Events */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Próximos eventos</h4>
          <span className="text-xs text-muted-foreground">
            {upcomingEvents?.length} eventos
          </span>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {upcomingEvents?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Calendar" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No hay eventos próximos</p>
            </div>
          ) : (
            upcomingEvents?.map((event) => (
              <div
                key={event?.id}
                className={`p-3 rounded-lg border-l-4 cursor-pointer hover:bg-muted/50 transition-colors ${getEventTypeColor(event?.type)}`}
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-sm text-foreground line-clamp-2">
                    {event?.title}
                  </h5>
                  {event?.requiresRsvp && (
                    <Icon name="Users" size={12} className="text-muted-foreground ml-2 flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {formatEventDate(event?.date)} • {formatEventTime(event?.date)}
                </div>
                
                {event?.location && (
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {event?.location}
                  </div>
                )}

                {event?.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {event?.description}
                  </p>
                )}

                {event?.requiresRsvp && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">RSVP requerido</span>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        event?.rsvpStatus === 'confirmed' ?'bg-success/20 text-success' 
                          : event?.rsvpStatus === 'declined' ?'bg-error/20 text-error' :'bg-warning/20 text-warning'
                      }`}>
                        {event?.rsvpStatus === 'confirmed' ? 'Confirmado' : 
                         event?.rsvpStatus === 'declined' ? 'Declinado' : 'Pendiente'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Icon name="Download" size={16} className="mr-2" />
            Exportar calendario
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Icon name="Plus" size={16} className="mr-2" />
            Sincronizar con Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventSidebar;