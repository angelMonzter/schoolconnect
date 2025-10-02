import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const NewMessageModal = ({ 
  isOpen, 
  onClose, 
  onSendMessage, 
  teachers = [],
  selectedChild 
}) => {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    message: '',
    priority: 'normal',
    childId: selectedChild || ''
  });
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teacherOptions = [
    { value: '', label: 'Seleccionar destinatario' },
    ...teachers?.map(teacher => ({
      value: teacher?.id,
      label: `${teacher?.name} - ${teacher?.subject}`,
      description: teacher?.role
    }))
  ];

  const priorityOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'urgent', label: 'Urgente' },
    { value: 'low', label: 'Baja prioridad' }
  ];

  const childOptions = [
    { value: 'child1', label: 'María González (5° Grado)' },
    { value: 'child2', label: 'Carlos González (3° Grado)' },
    { value: 'child3', label: 'Ana González (1° Grado)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!formData?.recipient || !formData?.message?.trim()) return;

    setIsSubmitting(true);
    
    try {
      const messageData = {
        ...formData,
        attachments,
        timestamp: new Date(),
        id: Date.now()?.toString()
      };
      
      await onSendMessage(messageData);
      
      // Reset form
      setFormData({
        recipient: '',
        subject: '',
        message: '',
        priority: 'normal',
        childId: selectedChild || ''
      });
      setAttachments([]);
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevation-modal w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Nuevo Mensaje
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Recipient and Child Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Destinatario"
                options={teacherOptions}
                value={formData?.recipient}
                onChange={(value) => handleInputChange('recipient', value)}
                required
                searchable
              />
              
              <Select
                label="Hijo"
                options={childOptions}
                value={formData?.childId}
                onChange={(value) => handleInputChange('childId', value)}
                required
              />
            </div>

            {/* Subject and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Asunto"
                  type="text"
                  placeholder="Ingresa el asunto del mensaje"
                  value={formData?.subject}
                  onChange={(e) => handleInputChange('subject', e?.target?.value)}
                  required
                />
              </div>
              
              <Select
                label="Prioridad"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
              />
            </div>

            {/* Message Content */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mensaje *
              </label>
              <textarea
                value={formData?.message}
                onChange={(e) => handleInputChange('message', e?.target?.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full px-4 py-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
                rows={6}
                required
              />
            </div>

            {/* Attachments */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-foreground">
                  Archivos Adjuntos
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <Icon name="Paperclip" size={16} className="mr-2" />
                  Adjuntar Archivo
                </Button>
              </div>

              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />

              {attachments?.length > 0 && (
                <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                  {attachments?.map(attachment => (
                    <div key={attachment?.id} className="flex items-center justify-between p-2 bg-background rounded border border-border">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={attachment?.type?.startsWith('image/') ? 'Image' : 'FileText'} 
                          size={20} 
                          className="text-muted-foreground" 
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground truncate max-w-48">
                            {attachment?.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(attachment?.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(attachment?.id)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Templates */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Plantillas Rápidas
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Solicitar reunión',
                  'Consulta sobre tareas',
                  'Información sobre calificaciones',
                  'Ausencia justificada'
                ]?.map(template => (
                  <Button
                    key={template}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const templates = {
                        'Solicitar reunión': `Estimado/a profesor/a,\n\nMe gustaría solicitar una reunión para conversar sobre el progreso académico de mi hijo/a.\n\n¿Podríamos coordinar una fecha y hora conveniente?\n\nGracias por su tiempo.`,
                        'Consulta sobre tareas': `Estimado/a profesor/a,\n\nTengo algunas dudas sobre las tareas asignadas y me gustaría obtener clarificación.\n\n¿Podría proporcionarme más información?\n\nGracias.`,
                        'Información sobre calificaciones': `Estimado/a profesor/a,\n\nMe gustaría obtener información adicional sobre las calificaciones recientes de mi hijo/a.\n\n¿Podríamos revisar juntos el progreso?\n\nGracias.`,
                        'Ausencia justificada': `Estimado/a profesor/a,\n\nLe informo que mi hijo/a no podrá asistir a clases debido a [motivo].\n\n¿Podría proporcionarme información sobre las actividades que se realizarán?\n\nGracias por su comprensión.`
                      };
                      handleInputChange('message', templates?.[template]);
                    }}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {formData?.priority === 'urgent' && (
                  <div className="flex items-center space-x-1 text-error">
                    <Icon name="AlertTriangle" size={16} />
                    <span>Este mensaje se marcará como urgente</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={isSubmitting}
                  disabled={!formData?.recipient || !formData?.message?.trim()}
                  iconName="Send"
                  iconPosition="left"
                >
                  Enviar Mensaje
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMessageModal;