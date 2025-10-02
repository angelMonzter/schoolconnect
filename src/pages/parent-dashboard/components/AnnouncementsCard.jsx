import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnnouncementsCard = ({ announcements = [], onViewAll }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(index)) {
      newExpanded?.delete(index);
    } else {
      newExpanded?.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Anuncios Escolares</h3>
        {onViewAll && (
          <Button variant="ghost" onClick={onViewAll} className="text-sm text-primary hover:text-primary/80">
            Ver todos
            <Icon name="ArrowRight" size={16} className="ml-1" />
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {announcements?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Megaphone" size={48} className="mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No hay anuncios recientes</p>
          </div>
        ) : (
          announcements?.map((announcement, index) => {
            const isExpanded = expandedItems?.has(index);
            const shouldTruncate = announcement?.content?.length > 120;
            
            return (
              <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full bg-muted ${getPriorityColor(announcement?.priority)}`}>
                    <Icon name={getPriorityIcon(announcement?.priority)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-foreground line-clamp-1">
                        {announcement?.title}
                      </h4>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {formatDate(announcement?.date)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {isExpanded || !shouldTruncate 
                        ? announcement?.content 
                        : truncateText(announcement?.content)
                      }
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Icon name="User" size={12} />
                          <span>{announcement?.author}</span>
                        </span>
                        
                        {announcement?.category && (
                          <span className="flex items-center space-x-1">
                            <Icon name="Tag" size={12} />
                            <span>{announcement?.category}</span>
                          </span>
                        )}
                      </div>
                      
                      {shouldTruncate && (
                        <Button
                          variant="ghost"
                          onClick={() => toggleExpanded(index)}
                          className="text-xs text-primary hover:text-primary/80 p-0 h-auto"
                        >
                          {isExpanded ? 'Ver menos' : 'Ver más'}
                          <Icon 
                            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                            size={14} 
                            className="ml-1" 
                          />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AnnouncementsCard;