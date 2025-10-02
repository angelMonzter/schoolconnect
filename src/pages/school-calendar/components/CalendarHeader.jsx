import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewModeChange, 
  onPrevious, 
  onNext, 
  onToday,
  selectedChild,
  onChildChange 
}) => {
  const viewOptions = [
    { value: 'month', label: 'Mes' },
    { value: 'week', label: 'Semana' },
    { value: 'day', label: 'Día' }
  ];

  const childOptions = [
    { value: 'all', label: 'Todos los hijos' },
    { value: 'child1', label: 'María González (5° Grado)' },
    { value: 'child2', label: 'Carlos González (3° Grado)' },
    { value: 'child3', label: 'Ana González (1° Grado)' }
  ];

  const formatDate = () => {
    const options = { 
      year: 'numeric', 
      month: 'long',
      ...(viewMode === 'day' && { day: 'numeric' })
    };
    return currentDate?.toLocaleDateString('es-ES', options);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Date Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              className="w-10 h-10 p-0"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              className="w-10 h-10 p-0"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
          
          <h2 className="text-xl font-semibold text-foreground capitalize">
            {formatDate()}
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToday}
            className="text-primary hover:text-primary"
          >
            Hoy
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={childOptions}
            value={selectedChild}
            onChange={onChildChange}
            className="min-w-[200px]"
          />
          
          <Select
            options={viewOptions}
            value={viewMode}
            onChange={onViewModeChange}
            className="min-w-[120px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;