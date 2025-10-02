import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ConversationList from './components/ConversationList';
import MessageThread from './components/MessageThread';
import MessageSearch from './components/MessageSearch';
import NewMessageModal from './components/NewMessageModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MessagingCenter = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('child1');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

  // Mock data for conversations
  const mockConversations = [
    {
      id: 'conv1',
      participant: {
        id: 'teacher1',
        name: 'Prof. Ana Martínez',
        role: 'teacher',
        subject: 'Matemáticas',
        isOnline: true
      },
      childName: 'María González',
      subject: 'Consulta sobre examen de álgebra',
      lastMessage: {
        id: 'msg1',
        content: 'Perfecto, nos vemos el viernes a las 3:00 PM. Gracias por coordinar.',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        senderId: 'parent',
        status: 'read'
      },
      unreadCount: 0,
      priority: 'normal'
    },
    {
      id: 'conv2',
      participant: {
        id: 'teacher2',
        name: 'Prof. Carlos Ruiz',
        role: 'teacher',
        subject: 'Historia',
        isOnline: false
      },
      childName: 'Carlos González',
      subject: 'Proyecto de historia antigua',
      lastMessage: {
        id: 'msg2',
        content: 'He revisado el proyecto de Carlos. Está muy bien estructurado, pero necesita incluir más fuentes primarias. ¿Podríamos hablar sobre esto?',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        senderId: 'teacher2',
        status: 'delivered'
      },
      unreadCount: 2,
      priority: 'normal'
    },
    {
      id: 'conv3',
      participant: {
        id: 'admin1',
        name: 'Secretaría Académica',
        role: 'admin',
        isOnline: true
      },
      childName: 'Ana González',
      subject: 'Documentación pendiente',
      lastMessage: {
        id: 'msg3',
        content: 'Recordatorio: Faltan los documentos médicos de Ana para completar su expediente.',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        senderId: 'admin1',
        status: 'sent'
      },
      unreadCount: 1,
      priority: 'urgent'
    },
    {
      id: 'conv4',
      participant: {
        id: 'teacher3',
        name: 'Prof. Laura Sánchez',
        role: 'teacher',
        subject: 'Ciencias',
        isOnline: false
      },
      childName: 'María González',
      subject: 'Experimento de química',
      lastMessage: {
        id: 'msg4',
        content: 'Excelente trabajo en el laboratorio hoy. María mostró gran interés en los experimentos.',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        senderId: 'teacher3',
        status: 'read'
      },
      unreadCount: 0,
      priority: 'normal'
    }
  ];

  // Mock data for messages in selected conversation
  const mockMessages = [
    {
      id: 'msg1',
      content: 'Buenos días, Prof. Martínez. Me gustaría solicitar una reunión para hablar sobre el progreso de María en matemáticas.',
      timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
      senderId: 'parent',
      status: 'read'
    },
    {
      id: 'msg2',
      content: 'Buenos días, Sra. González. Por supuesto, estaré encantada de reunirme con usted. María está progresando muy bien, especialmente en álgebra.',
      timestamp: new Date(Date.now() - 86400000 * 2 + 1800000), // 2 days ago + 30 min
      senderId: 'teacher1',
      status: 'read'
    },
    {
      id: 'msg3',
      content: 'Me alegra escuchar eso. ¿Qué día y hora le vendría mejor para la reunión?',
      timestamp: new Date(Date.now() - 86400000 * 2 + 3600000), // 2 days ago + 1 hour
      senderId: 'parent',
      status: 'read'
    },
    {
      id: 'msg4',
      content: 'El viernes por la tarde estaría bien. ¿Le parece a las 3:00 PM en mi aula?',
      timestamp: new Date(Date.now() - 86400000 + 3600000), // Yesterday + 1 hour
      senderId: 'teacher1',
      status: 'read'
    },
    {
      id: 'msg5',
      content: 'Perfecto, nos vemos el viernes a las 3:00 PM. Gracias por coordinar.',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      senderId: 'parent',
      status: 'read'
    }
  ];

  // Mock teachers data for new message modal
  const mockTeachers = [
    { id: 'teacher1', name: 'Prof. Ana Martínez', subject: 'Matemáticas', role: 'Profesora' },
    { id: 'teacher2', name: 'Prof. Carlos Ruiz', subject: 'Historia', role: 'Profesor' },
    { id: 'teacher3', name: 'Prof. Laura Sánchez', subject: 'Ciencias', role: 'Profesora' },
    { id: 'teacher4', name: 'Prof. Miguel Torres', subject: 'Educación Física', role: 'Profesor' },
    { id: 'admin1', name: 'Secretaría Académica', subject: 'Administración', role: 'Administrador' }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/parent-dashboard', icon: 'Home' },
    { label: 'Centro de Mensajes', icon: 'MessageCircle' }
  ];

  const notificationCounts = {
    messaging_center: mockConversations?.reduce((total, conv) => total + conv?.unreadCount, 0),
    assignment_tracking: 5,
    academic_progress: 2,
    school_calendar: 3
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) {
        setShowConversationList(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobileView) {
      setShowConversationList(false);
    }
  };

  const handleSendMessage = (messageData) => {
    console.log('Sending message:', messageData);
    // Here you would typically send the message to your backend
    // For now, we'll just log it
  };

  const handleMarkAsRead = (conversationId) => {
    console.log('Marking conversation as read:', conversationId);
    // Here you would typically update the read status in your backend
  };

  const handleSearch = (searchData) => {
    console.log('Searching messages:', searchData);
    // Here you would typically perform the search in your backend
  };

  const handleBackToList = () => {
    setShowConversationList(true);
    setSelectedConversation(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedChild={selectedChild}
        onChildChange={setSelectedChild}
        notificationCounts={notificationCounts}
      />
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Mobile Header */}
        {isMobileView && (
          <div className="mb-4 flex items-center justify-between">
            <h1 className="font-heading font-bold text-2xl text-foreground">
              Centro de Mensajes
            </h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Icon name="Search" size={16} />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsNewMessageModalOpen(true)}
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        {!isMobileView && (
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                Centro de Mensajes
              </h1>
              <p className="text-muted-foreground">
                Comunícate directamente con profesores y personal administrativo
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsSearchModalOpen(true)}
                iconName="Search"
                iconPosition="left"
              >
                Buscar Mensajes
              </Button>
              <Button
                variant="default"
                onClick={() => setIsNewMessageModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Nuevo Mensaje
              </Button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-card rounded-lg shadow-elevation-1 overflow-hidden" style={{ height: '70vh' }}>
          <div className="h-full flex">
            {/* Conversation List */}
            {(!isMobileView || showConversationList) && (
              <div className={`${isMobileView ? 'w-full' : 'w-1/3'} border-r border-border`}>
                <ConversationList
                  conversations={mockConversations}
                  selectedConversation={selectedConversation}
                  onSelectConversation={handleSelectConversation}
                  selectedChild={selectedChild}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  filterType={filterType}
                  onFilterChange={setFilterType}
                />
              </div>
            )}

            {/* Message Thread */}
            {(!isMobileView || !showConversationList) && (
              <div className={`${isMobileView ? 'w-full' : 'flex-1'} relative`}>
                {/* Mobile Back Button */}
                {isMobileView && selectedConversation && (
                  <div className="absolute top-4 left-4 z-10">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToList}
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Volver
                    </Button>
                  </div>
                )}
                
                <MessageThread
                  conversation={selectedConversation}
                  messages={selectedConversation ? mockMessages : []}
                  onSendMessage={handleSendMessage}
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Desktop Only */}
        {!isMobileView && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Mensajes Recientes</h3>
                  <p className="text-sm text-muted-foreground">Últimas 24 horas</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {mockConversations?.filter(conv => 
                  new Date() - new Date(conv.lastMessage.timestamp) < 86400000
                )?.length}
              </p>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Mensajes Urgentes</h3>
                  <p className="text-sm text-muted-foreground">Requieren atención</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {mockConversations?.filter(conv => conv?.priority === 'urgent')?.length}
              </p>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Profesores Activos</h3>
                  <p className="text-sm text-muted-foreground">En línea ahora</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {mockConversations?.filter(conv => conv?.participant?.isOnline)?.length}
              </p>
            </div>
          </div>
        )}
      </main>
      {/* Modals */}
      <MessageSearch
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearch}
        conversations={mockConversations}
        searchResults={[]}
        isSearching={false}
      />
      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        onClose={() => setIsNewMessageModalOpen(false)}
        onSendMessage={handleSendMessage}
        teachers={mockTeachers}
        selectedChild={selectedChild}
      />
    </div>
  );
};

export default MessagingCenter;