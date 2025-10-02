import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityCard = ({ activities = [], onViewAll }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'grade':
        return 'Award';
      case 'assignment':
        return 'BookOpen';
      case 'message':
        return 'MessageCircle';
      case 'attendance':
        return 'Calendar';
      case 'event':
        return 'CalendarDays';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'grade':
        return 'text-success';
      case 'assignment':
        return 'text-warning';
      case 'message':
        return 'text-primary';
      case 'attendance':
        return 'text-error';
      case 'event':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `hace ${Math.floor(diffInMinutes / 60)} h`;
    } else {
      return time?.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Actividad Reciente</h3>
        {onViewAll && (
          <Button variant="ghost" onClick={onViewAll} className="text-sm text-primary hover:text-primary/80">
            Ver todo
            <Icon name="ArrowRight" size={16} className="ml-1" />
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Clock" size={48} className="mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No hay actividad reciente</p>
          </div>
        ) : (
          activities?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-2">
                  {activity?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity?.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(activity?.timestamp)}
                  </span>
                  {activity?.childName && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {activity?.childName}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {activity?.urgent && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;