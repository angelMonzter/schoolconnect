import React from 'react';
import Button from '../../../components/ui/Button';


const CalendarGrid = ({ 
  currentDate, 
  viewMode, 
  events, 
  onEventClick, 
  onDateClick 
}) => {
  const today = new Date();
  
  const getEventTypeColor = (type) => {
    const colors = {
      'academic': 'bg-primary text-primary-foreground',
      'holiday': 'bg-success text-success-foreground',
      'conference': 'bg-warning text-warning-foreground',
      'activity': 'bg-secondary text-secondary-foreground',
      'exam': 'bg-error text-error-foreground',
      'meeting': 'bg-accent text-accent-foreground'
    };
    return colors?.[type] || 'bg-muted text-muted-foreground';
  };

  const renderMonthView = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days?.push(new Date(current));
      current?.setDate(current?.getDate() + 1);
    }

    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Week Headers */}
        <div className="grid grid-cols-7 bg-muted">
          {weekDays?.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days?.map((day, index) => {
            const isCurrentMonth = day?.getMonth() === month;
            const isToday = day?.toDateString() === today?.toDateString();
            const dayEvents = events?.filter(event => 
              new Date(event.date)?.toDateString() === day?.toDateString()
            );

            return (
              <div
                key={index}
                className={`min-h-[120px] border-r border-b border-border last:border-r-0 p-2 cursor-pointer hover:bg-muted/50 transition-colors ${
                  !isCurrentMonth ? 'bg-muted/20 text-muted-foreground' : 'bg-background'
                }`}
                onClick={() => onDateClick(day)}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isToday ? 'bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center' : ''
                }`}>
                  {day?.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents?.slice(0, 3)?.map((event) => (
                    <Button
                      key={event?.id}
                      variant="ghost"
                      size="xs"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEventClick(event);
                      }}
                      className={`w-full text-left p-1 h-auto text-xs truncate ${getEventTypeColor(event?.type)}`}
                    >
                      {event?.title}
                    </Button>
                  ))}
                  {dayEvents?.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{dayEvents?.length - 3} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek?.setDate(currentDate?.getDate() - currentDate?.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      weekDays?.push(day);
    }

    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Week Header */}
        <div className="grid grid-cols-8 bg-muted border-b border-border">
          <div className="p-3 text-sm font-medium text-muted-foreground">Hora</div>
          {weekDays?.map((day) => {
            const isToday = day?.toDateString() === today?.toDateString();
            return (
              <div key={day?.toISOString()} className={`p-3 text-center border-l border-border ${
                isToday ? 'bg-primary/10' : ''
              }`}>
                <div className="text-sm font-medium">{day?.toLocaleDateString('es-ES', { weekday: 'short' })}</div>
                <div className={`text-lg ${isToday ? 'text-primary font-semibold' : ''}`}>
                  {day?.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        {/* Time Grid */}
        <div className="max-h-[600px] overflow-y-auto">
          {hours?.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-border last:border-b-0">
              <div className="p-2 text-xs text-muted-foreground border-r border-border bg-muted/50">
                {hour?.toString()?.padStart(2, '0')}:00
              </div>
              {weekDays?.map((day) => {
                const dayEvents = events?.filter(event => {
                  const eventDate = new Date(event.date);
                  return eventDate?.toDateString() === day?.toDateString() && 
                         eventDate?.getHours() === hour;
                });

                return (
                  <div key={`${day?.toISOString()}-${hour}`} className="p-1 border-l border-border min-h-[60px]">
                    {dayEvents?.map((event) => (
                      <Button
                        key={event?.id}
                        variant="ghost"
                        size="xs"
                        onClick={() => onEventClick(event)}
                        className={`w-full text-left p-1 mb-1 text-xs ${getEventTypeColor(event?.type)}`}
                      >
                        {event?.title}
                      </Button>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = events?.filter(event => 
      new Date(event.date)?.toDateString() === currentDate?.toDateString()
    )?.sort((a, b) => new Date(a.date) - new Date(b.date));

    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border bg-muted">
          <h3 className="text-lg font-semibold">
            {currentDate?.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
        </div>
        <div className="max-h-[600px] overflow-y-auto">
          {hours?.map((hour) => {
            const hourEvents = dayEvents?.filter(event => 
              new Date(event.date)?.getHours() === hour
            );

            return (
              <div key={hour} className="flex border-b border-border last:border-b-0">
                <div className="w-20 p-3 text-sm text-muted-foreground border-r border-border bg-muted/50">
                  {hour?.toString()?.padStart(2, '0')}:00
                </div>
                <div className="flex-1 p-3 min-h-[80px]">
                  {hourEvents?.map((event) => (
                    <Button
                      key={event?.id}
                      variant="ghost"
                      onClick={() => onEventClick(event)}
                      className={`w-full text-left p-3 mb-2 ${getEventTypeColor(event?.type)}`}
                    >
                      <div className="font-medium">{event?.title}</div>
                      <div className="text-sm opacity-80">{event?.location}</div>
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1">
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
    </div>
  );
};

export default CalendarGrid;