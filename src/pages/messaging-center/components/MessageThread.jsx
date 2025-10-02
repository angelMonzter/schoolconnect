import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MessageThread = ({ 
  conversation, 
  messages, 
  onSendMessage, 
  onMarkAsRead,
  currentUserId = 'parent'
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
    if (conversation && conversation?.unreadCount > 0) {
      onMarkAsRead(conversation?.id);
    }
  }, [messages, conversation]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage?.trim() && attachments?.length === 0) return;

    const messageData = {
      content: newMessage?.trim(),
      attachments: attachments,
      timestamp: new Date(),
      senderId: currentUserId,
      conversationId: conversation?.id
    };

    onSendMessage(messageData);
    setNewMessage('');
    setAttachments([]);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    const newAttachments = files?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      url: URL.createObjectURL(file)
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (attachmentId) => {
    setAttachments(prev => prev?.filter(att => att?.id !== attachmentId));
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('es-ES', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMessageStatusIcon = (status) => {
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

  const renderAttachment = (attachment) => {
    const isImage = attachment?.type?.startsWith('image/');
    
    return (
      <div key={attachment?.id} className="mt-2">
        {isImage ? (
          <div className="relative max-w-xs">
            <Image
              src={attachment?.url}
              alt={attachment?.name}
              className="rounded-lg max-h-48 object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-2 bg-muted rounded-lg p-3 max-w-xs">
            <Icon name="FileText" size={20} className="text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{attachment?.name}</p>
              <p className="text-xs text-muted-foreground">
                {(attachment?.size / 1024)?.toFixed(1)} KB
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="Download" size={16} />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages?.forEach(message => {
      const date = new Date(message.timestamp)?.toDateString();
      if (!groups?.[date]) {
        groups[date] = [];
      }
      groups?.[date]?.push(message);
    });
    return groups;
  };

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Selecciona una conversación
          </h3>
          <p className="text-muted-foreground">
            Elige una conversación de la lista para comenzar a chatear
          </p>
        </div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
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
            <div>
              <h2 className="font-heading font-semibold text-foreground">
                {conversation?.participant?.name}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{conversation?.participant?.role === 'teacher' ? 'Profesor' : 'Administración'}</span>
                {conversation?.subject && (
                  <>
                    <span>•</span>
                    <span>{conversation?.subject}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {conversation?.priority === 'urgent' && (
              <div className="flex items-center space-x-1 text-error">
                <Icon name="AlertTriangle" size={16} />
                <span className="text-xs font-medium">Urgente</span>
              </div>
            )}
            <Button variant="ghost" size="sm">
              <Icon name="Phone" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Video" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups)?.map(([date, dayMessages]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-muted px-3 py-1 rounded-full">
                <span className="text-xs text-muted-foreground font-medium">
                  {formatDate(dayMessages?.[0]?.timestamp)}
                </span>
              </div>
            </div>

            {/* Messages for this date */}
            {dayMessages?.map((message, index) => {
              const isOwnMessage = message?.senderId === currentUserId;
              const showAvatar = !isOwnMessage && (
                index === 0 || 
                dayMessages?.[index - 1]?.senderId !== message?.senderId
              );

              return (
                <div
                  key={message?.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}
                >
                  {!isOwnMessage && (
                    <div className="w-8 h-8 mr-2 flex-shrink-0">
                      {showAvatar && (
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Icon 
                            name={conversation?.participant?.role === 'teacher' ? 'GraduationCap' : 'User'} 
                            size={16} 
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'ml-auto' : ''}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isOwnMessage
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-card border border-border rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
                      
                      {message?.attachments && message?.attachments?.map(attachment => 
                        renderAttachment(attachment)
                      )}
                    </div>

                    <div className={`flex items-center mt-1 space-x-1 ${
                      isOwnMessage ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message?.timestamp)}
                      </span>
                      {isOwnMessage && getMessageStatusIcon(message?.status)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 mr-2 flex-shrink-0">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={16} />
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        {/* Attachments Preview */}
        {attachments?.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachments?.map(attachment => (
              <div key={attachment?.id} className="relative">
                {attachment?.type?.startsWith('image/') ? (
                  <div className="relative">
                    <Image
                      src={attachment?.url}
                      alt={attachment?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => removeAttachment(attachment?.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 bg-muted rounded-lg p-2 pr-8 relative">
                    <Icon name="FileText" size={16} />
                    <span className="text-xs truncate max-w-20">{attachment?.name}</span>
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => removeAttachment(attachment?.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef?.current?.click()}
          >
            <Icon name="Paperclip" size={16} />
          </Button>

          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="w-full px-4 py-2 border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={handleSendMessage}
            disabled={!newMessage?.trim() && attachments?.length === 0}
            className="rounded-full w-10 h-10 p-0"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default MessageThread;