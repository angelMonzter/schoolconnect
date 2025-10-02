import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MessageSearch = ({ 
  isOpen, 
  onClose, 
  onSearch, 
  conversations,
  searchResults = [],
  isSearching = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    participant: '',
    dateRange: '',
    hasAttachments: false,
    messageType: 'all'
  });

  const participantOptions = [
    { value: '', label: 'Todos los contactos' },
    ...conversations?.map(conv => ({
      value: conv?.participant?.id,
      label: conv?.participant?.name
    }))
  ];

  const dateRangeOptions = [
    { value: '', label: 'Cualquier fecha' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'year', label: 'Este año' }
  ];

  const messageTypeOptions = [
    { value: 'all', label: 'Todos los mensajes' },
    { value: 'sent', label: 'Mensajes enviados' },
    { value: 'received', label: 'Mensajes recibidos' },
    { value: 'attachments', label: 'Con archivos adjuntos' }
  ];

  useEffect(() => {
    if (searchQuery?.trim() || Object.values(searchFilters)?.some(filter => filter)) {
      const delayedSearch = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(delayedSearch);
    }
  }, [searchQuery, searchFilters]);

  const handleSearch = () => {
    onSearch({
      query: searchQuery?.trim(),
      filters: searchFilters
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchFilters({
      participant: '',
      dateRange: '',
      hasAttachments: false,
      messageType: 'all'
    });
  };

  const formatMessagePreview = (message) => {
    const maxLength = 100;
    return message?.content?.length > maxLength 
      ? message?.content?.substring(0, maxLength) + '...'
      : message?.content;
  };

  const formatSearchDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const highlightSearchTerm = (text, query) => {
    if (!query?.trim()) return text;
    
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-accent/30 text-accent-foreground">
          {part}
        </mark>
      ) : part
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevation-modal w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Buscar Mensajes
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Search Input */}
          <div className="mb-4">
            <Input
              type="search"
              placeholder="Buscar en mensajes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Contacto"
              options={participantOptions}
              value={searchFilters?.participant}
              onChange={(value) => setSearchFilters(prev => ({ ...prev, participant: value }))}
            />
            
            <Select
              label="Fecha"
              options={dateRangeOptions}
              value={searchFilters?.dateRange}
              onChange={(value) => setSearchFilters(prev => ({ ...prev, dateRange: value }))}
            />
            
            <Select
              label="Tipo"
              options={messageTypeOptions}
              value={searchFilters?.messageType}
              onChange={(value) => setSearchFilters(prev => ({ ...prev, messageType: value }))}
            />
          </div>

          {/* Clear Filters */}
          {(searchQuery || Object.values(searchFilters)?.some(filter => filter)) && (
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={clearSearch}>
                <Icon name="X" size={16} className="mr-2" />
                Limpiar búsqueda
              </Button>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Buscando mensajes...</p>
              </div>
            </div>
          ) : searchResults?.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {searchQuery || Object.values(searchFilters)?.some(filter => filter)
                  ? 'No se encontraron mensajes' :'Buscar mensajes'
                }
              </h3>
              <p className="text-muted-foreground">
                {searchQuery || Object.values(searchFilters)?.some(filter => filter)
                  ? 'Intenta con otros términos de búsqueda' :'Ingresa términos de búsqueda para encontrar mensajes específicos'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {searchResults?.length} resultado{searchResults?.length !== 1 ? 's' : ''} encontrado{searchResults?.length !== 1 ? 's' : ''}
                </p>
              </div>

              {searchResults?.map((result) => (
                <div
                  key={result?.id}
                  className="bg-background border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                    // Navigate to conversation and highlight message
                    onClose();
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon 
                        name={result?.participant?.role === 'teacher' ? 'GraduationCap' : 'User'} 
                        size={20} 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm text-foreground">
                          {result?.participant?.name}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {formatSearchDate(result?.timestamp)}
                        </span>
                      </div>
                      
                      {result?.subject && (
                        <p className="text-xs text-primary font-medium mb-2">
                          {result?.subject}
                        </p>
                      )}
                      
                      <p className="text-sm text-muted-foreground">
                        {highlightSearchTerm(formatMessagePreview(result), searchQuery)}
                      </p>
                      
                      {result?.attachments && result?.attachments?.length > 0 && (
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Icon name="Paperclip" size={12} className="mr-1" />
                          <span>{result?.attachments?.length} archivo{result?.attachments?.length !== 1 ? 's' : ''} adjunto{result?.attachments?.length !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageSearch;