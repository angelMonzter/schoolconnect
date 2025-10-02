import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EventModal = ({ event, isOpen, onClose, onRsvp }) => {
  const [rsvpStatus, setRsvpStatus] = useState(event?.rsvpStatus || 'pending');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !event) return null;

  const getEventTypeInfo = (type) => {
    const types = {
      'academic': { label: 'Académico', icon: 'BookOpen', color: 'text-primary' },
      'holiday': { label: 'Vacaciones', icon: 'Sun', color: 'text-success' },
      'conference': { label: 'Conferencia', icon: 'Users', color: 'text-warning' },
      'activity': { label: 'Actividad', icon: 'Zap', color: 'text-secondary' },
      'exam': { label: 'Examen', icon: 'FileText', color: 'text-error' },
      'meeting': { label: 'Reunión', icon: 'MessageCircle', color: 'text-accent' }
    };
    return types?.[type] || { label: 'Evento', icon: 'Calendar', color: 'text-foreground' };
  };

  const typeInfo = getEventTypeInfo(event?.type);

  const formatEventDate = (date) => {
    return new Date(date)?.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatEventTime = (date) => {
    return new Date(date)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRsvpSubmit = async (status) => {
    setIsSubmitting(true);
    try {
      await onRsvp(event?.id, status);
      setRsvpStatus(status);
    } catch (error) {
      console.error('Error updating RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + (event.duration || 60) * 60000);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event?.title)}&dates=${startDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z/${endDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z&details=${encodeURIComponent(event?.description || '')}&location=${encodeURIComponent(event?.location || '')}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={typeInfo?.icon} size={20} className={typeInfo?.color} />
              <span className={`text-sm font-medium ${typeInfo?.color}`}>
                {typeInfo?.label}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {event?.title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-8 h-8 p-0"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date and Time */}
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={20} className="text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium text-foreground">
                {formatEventDate(event?.date)}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatEventTime(event?.date)}
                {event?.endDate && ` - ${formatEventTime(event?.endDate)}`}
              </div>
            </div>
          </div>

          {/* Location */}
          {event?.location && (
            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={20} className="text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Ubicación</div>
                <div className="text-sm text-muted-foreground">
                  {event?.location}
                </div>
              </div>
            </div>
          )}

          {/* Organizer */}
          {event?.organizer && (
            <div className="flex items-start space-x-3">
              <Icon name="User" size={20} className="text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Organizador</div>
                <div className="text-sm text-muted-foreground">
                  {event?.organizer}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {event?.description && (
            <div className="flex items-start space-x-3">
              <Icon name="FileText" size={20} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-foreground mb-2">Descripción</div>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {event?.description}
                </div>
              </div>
            </div>
          )}

          {/* Attendees */}
          {event?.attendees && event?.attendees?.length > 0 && (
            <div className="flex items-start space-x-3">
              <Icon name="Users" size={20} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-foreground mb-2">Asistentes</div>
                <div className="text-sm text-muted-foreground">
                  {event?.attendees?.join(', ')}
                </div>
              </div>
            </div>
          )}

          {/* RSVP Section */}
          {event?.requiresRsvp && (
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Users" size={20} className="text-foreground" />
                <span className="font-medium text-foreground">Confirmación de asistencia</span>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Por favor confirma tu asistencia a este evento.
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant={rsvpStatus === 'confirmed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRsvpSubmit('confirmed')}
                    disabled={isSubmitting}
                    loading={isSubmitting && rsvpStatus !== 'confirmed'}
                  >
                    <Icon name="Check" size={16} className="mr-1" />
                    Asistiré
                  </Button>
                  <Button
                    variant={rsvpStatus === 'declined' ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => handleRsvpSubmit('declined')}
                    disabled={isSubmitting}
                    loading={isSubmitting && rsvpStatus !== 'declined'}
                  >
                    <Icon name="X" size={16} className="mr-1" />
                    No asistiré
                  </Button>
                </div>

                {rsvpStatus !== 'pending' && (
                  <div className={`text-sm px-3 py-2 rounded-lg ${
                    rsvpStatus === 'confirmed' ?'bg-success/20 text-success' :'bg-error/20 text-error'
                  }`}>
                    {rsvpStatus === 'confirmed' ?'✓ Has confirmado tu asistencia' :'✗ Has declinado la invitación'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Related Events */}
          {event?.relatedEvents && event?.relatedEvents?.length > 0 && (
            <div>
              <div className="font-medium text-foreground mb-3">Eventos relacionados</div>
              <div className="space-y-2">
                {event?.relatedEvents?.map((relatedEvent) => (
                  <div key={relatedEvent?.id} className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {relatedEvent?.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(relatedEvent.date)?.toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCalendar}
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Añadir a calendario
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.share({
                  title: event?.title,
                  text: event?.description,
                  url: window.location?.href
                })?.catch(() => {
                  // Fallback for browsers that don't support Web Share API
                  navigator.clipboard?.writeText(window.location?.href);
                });
              }}
            >
              <Icon name="Share" size={16} className="mr-2" />
              Compartir
            </Button>
          </div>
          
          <Button variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;