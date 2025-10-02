import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodayScheduleCard = ({ schedule = [], onViewCalendar }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case 'class':
        return 'BookOpen';
      case 'exam':
        return 'FileText';
      case 'meeting':
        return 'Users';
      case 'event':
        return 'Calendar';
      case 'assignment':
        return 'PenTool';
      default:
        return 'Clock';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'class':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'exam':
        return 'bg-error/10 text-error border-error/20';
      case 'meeting':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'event':
        return 'bg-success/10 text-success border-success/20';
      case 'assignment':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const isUpcoming = (timeString) => {
    const now = new Date();
    const eventTime = new Date(`${now.toDateString()} ${timeString}`);
    return eventTime > now;
  };

  const sortedSchedule = [...schedule]?.sort((a, b) => {
    return a?.startTime?.localeCompare(b?.startTime);
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Horario de Hoy</h3>
        {onViewCalendar && (
          <Button variant="ghost" onClick={onViewCalendar} className="text-sm text-primary hover:text-primary/80">
            Ver calendario
            <Icon name="Calendar" size={16} className="ml-1" />
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {sortedSchedule?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No hay eventos programados para hoy</p>
          </div>
        ) : (
          sortedSchedule?.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 ${
                isUpcoming(item?.startTime) 
                  ? 'bg-card hover:shadow-md' 
                  : 'bg-muted/30 opacity-75'
              }`}
            >
              <div className={`p-2 rounded-lg border ${getEventColor(item?.type)}`}>
                <Icon name={getEventIcon(item?.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-sm text-foreground truncate">
                    {item?.title}
                  </h4>
                  {isUpcoming(item?.startTime) && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0"></div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>
                      {formatTime(item?.startTime)}
                      {item?.endTime && ` - ${formatTime(item?.endTime)}`}
                    </span>
                  </span>
                  
                  {item?.location && (
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{item?.location}</span>
                    </span>
                  )}
                  
                  {item?.childName && (
                    <span className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{item?.childName}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodayScheduleCard;