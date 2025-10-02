import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications = [], onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all'); // all, unread, urgent

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'grade':
        return 'Award';
      case 'assignment':
        return 'BookOpen';
      case 'message':
        return 'MessageCircle';
      case 'attendance':
        return 'UserCheck';
      case 'event':
        return 'Calendar';
      case 'payment':
        return 'CreditCard';
      case 'emergency':
        return 'AlertTriangle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, urgent = false) => {
    if (urgent) return 'text-error';
    
    switch (type) {
      case 'grade':
        return 'text-success';
      case 'assignment':
        return 'text-warning';
      case 'message':
        return 'text-primary';
      case 'attendance':
        return 'text-secondary';
      case 'event':
        return 'text-accent';
      case 'payment':
        return 'text-warning';
      case 'emergency':
        return 'text-error';
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
      return time?.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const filteredNotifications = notifications?.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification?.read;
      case 'urgent':
        return notification?.urgent;
      default:
        return true;
    }
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;
  const urgentCount = notifications?.filter(n => n?.urgent)?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Centro de Notificaciones</h3>
        {unreadCount > 0 && onMarkAllAsRead && (
          <Button 
            variant="ghost" 
            onClick={onMarkAllAsRead}
            className="text-sm text-primary hover:text-primary/80"
          >
            Marcar todo como leído
          </Button>
        )}
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        <Button
          variant={filter === 'all' ? 'default' : 'ghost'}
          onClick={() => setFilter('all')}
          className="flex-1 text-sm py-2"
        >
          Todas ({notifications?.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'ghost'}
          onClick={() => setFilter('unread')}
          className="flex-1 text-sm py-2"
        >
          No leídas ({unreadCount})
        </Button>
        <Button
          variant={filter === 'urgent' ? 'default' : 'ghost'}
          onClick={() => setFilter('urgent')}
          className="flex-1 text-sm py-2"
        >
          Urgentes ({urgentCount})
        </Button>
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">
              {filter === 'all' ? 'No hay notificaciones' : 
               filter === 'unread' ? 'No hay notificaciones sin leer' : 
               'No hay notificaciones urgentes'}
            </p>
          </div>
        ) : (
          filteredNotifications?.map((notification, index) => (
            <div 
              key={index}
              className={`flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm ${
                notification?.read 
                  ? 'bg-card border-border' :'bg-primary/5 border-primary/20'
              }`}
              onClick={() => onMarkAsRead && onMarkAsRead(index)}
            >
              <div className={`p-2 rounded-full bg-muted ${getNotificationColor(notification?.type, notification?.urgent)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className={`text-sm line-clamp-1 ${notification?.read ? 'font-normal text-muted-foreground' : 'font-medium text-foreground'}`}>
                    {notification?.title}
                  </h4>
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    {notification?.urgent && (
                      <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                    )}
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {notification?.message}
                </p>
                
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>{formatTime(notification?.timestamp)}</span>
                  {notification?.childName && (
                    <>
                      <span>•</span>
                      <span>{notification?.childName}</span>
                    </>
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

export default NotificationCenter;