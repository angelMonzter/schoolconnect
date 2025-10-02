import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const ConversationList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation, 
  selectedChild,
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange 
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'Todas las conversaciones' },
    { value: 'unread', label: 'No leídas' },
    { value: 'teachers', label: 'Profesores' },
    { value: 'administration', label: 'Administración' },
    { value: 'urgent', label: 'Urgentes' }
  ];

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageTime?.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // Less than a week
      return messageTime?.toLocaleDateString('es-ES', { weekday: 'short' });
    } else {
      return messageTime?.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit' 
      });
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Icon name="Check" size={14} className="text-muted-foreground" />;
      case 'delivered':
        return <Icon name="CheckCheck" size={14} className="text-muted-foreground" />;
      case 'read':
        return <Icon name="CheckCheck" size={14} className="text-primary" />;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'urgent') {
      return <Icon name="AlertTriangle" size={16} className="text-error" />;
    }
    return null;
  };

  const filteredConversations = conversations?.filter(conv => {
    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery?.toLowerCase();
      const matchesName = conv?.participant?.name?.toLowerCase()?.includes(searchLower);
      const matchesSubject = conv?.subject?.toLowerCase()?.includes(searchLower);
      const matchesLastMessage = conv?.lastMessage?.content?.toLowerCase()?.includes(searchLower);
      
      if (!matchesName && !matchesSubject && !matchesLastMessage) {
        return false;
      }
    }

    // Filter by type
    switch (filterType) {
      case 'unread':
        return conv?.unreadCount > 0;
      case 'teachers':
        return conv?.participant?.role === 'teacher';
      case 'administration':
        return conv?.participant?.role === 'admin';
      case 'urgent':
        return conv?.priority === 'urgent';
      default:
        return true;
    }
  });

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Mensajes
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Icon name="Search" size={16} />
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          {isSearchExpanded && (
            <div className="animate-accordion-down">
              <Input
                type="search"
                placeholder="Buscar conversaciones..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="w-full"
              />
            </div>
          )}
          
          <Select
            options={filterOptions}
            value={filterType}
            onChange={onFilterChange}
            placeholder="Filtrar por..."
            className="w-full"
          />
        </div>
      </div>
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No se encontraron conversaciones' : 'No hay mensajes'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations?.map((conversation) => (
              <div
                key={conversation?.id}
                className={`p-4 cursor-pointer transition-colors duration-200 hover:bg-muted/50 ${
                  selectedConversation?.id === conversation?.id 
                    ? 'bg-primary/10 border-r-2 border-r-primary' :''
                }`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Icon 
                        name={conversation?.participant?.role === 'teacher' ? 'GraduationCap' : 'User'} 
                        size={20} 
                      />
                    </div>
                    {conversation?.participant?.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-sm text-foreground truncate">
                          {conversation?.participant?.name}
                        </h3>
                        {getPriorityIcon(conversation?.priority)}
                      </div>
                      <div className="flex items-center space-x-1">
                        {conversation?.lastMessage?.senderId === 'parent' && 
                          getStatusIcon(conversation?.lastMessage?.status)
                        }
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation?.lastMessage?.timestamp)}
                        </span>
                      </div>
                    </div>

                    {conversation?.subject && (
                      <p className="text-xs text-primary font-medium mb-1 truncate">
                        {conversation?.subject}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate flex-1">
                        {conversation?.lastMessage?.senderId === 'parent' && 'Tú: '}
                        {conversation?.lastMessage?.content}
                      </p>
                      {conversation?.unreadCount > 0 && (
                        <NotificationBadge 
                          count={conversation?.unreadCount} 
                          size="sm"
                          className="ml-2"
                          onClick={() => {}}
                        />
                      )}
                    </div>

                    {/* Child info if relevant */}
                    {conversation?.childName && (
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Icon name="User" size={12} className="mr-1" />
                        <span>{conversation?.childName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* New Message Button */}
      <div className="p-4 border-t border-border">
        <Button
          variant="default"
          className="w-full"
          iconName="Plus"
          iconPosition="left"
        >
          Nuevo Mensaje
        </Button>
      </div>
    </div>
  );
};

export default ConversationList;