import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AssignmentFilters = ({ 
  selectedChild, 
  onChildChange, 
  selectedSubject, 
  onSubjectChange,
  selectedStatus,
  onStatusChange,
  selectedDateRange,
  onDateRangeChange,
  onClearFilters,
  viewMode,
  onViewModeChange
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const childrenOptions = [
    { value: 'all', label: 'Todos los hijos' },
    { value: 'child1', label: 'María González (5° Grado)' },
    { value: 'child2', label: 'Carlos González (3° Grado)' },
    { value: 'child3', label: 'Ana González (1° Grado)' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'Todas las materias' },
    { value: 'mathematics', label: 'Matemáticas' },
    { value: 'spanish', label: 'Lengua Española' },
    { value: 'science', label: 'Ciencias Naturales' },
    { value: 'social', label: 'Ciencias Sociales' },
    { value: 'english', label: 'Inglés' },
    { value: 'art', label: 'Educación Artística' },
    { value: 'physical', label: 'Educación Física' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'completed', label: 'Completada' },
    { value: 'overdue', label: 'Atrasada' },
    { value: 'submitted', label: 'Entregada' },
    { value: 'graded', label: 'Calificada' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Todas las fechas' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'overdue', label: 'Vencidas' }
  ];

  const hasActiveFilters = selectedChild !== 'all' || selectedSubject !== 'all' || 
                          selectedStatus !== 'all' || selectedDateRange !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Filtros de Tareas
          </h3>
          {hasActiveFilters && (
            <div className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
              Filtros activos
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="hidden md:flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('table')}
              className="px-3 py-1"
            >
              <Icon name="List" size={16} className="mr-1" />
              Tabla
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('calendar')}
              className="px-3 py-1"
            >
              <Icon name="Calendar" size={16} className="mr-1" />
              Calendario
            </Button>
          </div>

          {/* Mobile Filters Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="md:hidden"
          >
            <Icon name="Filter" size={16} className="mr-1" />
            Filtros
            <Icon name={isFiltersExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="ml-1" />
          </Button>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Select
          label="Hijo"
          options={childrenOptions}
          value={selectedChild}
          onChange={onChildChange}
          className="w-full"
        />
        
        <Select
          label="Materia"
          options={subjectOptions}
          value={selectedSubject}
          onChange={onSubjectChange}
          className="w-full"
        />
        
        <Select
          label="Estado"
          options={statusOptions}
          value={selectedStatus}
          onChange={onStatusChange}
          className="w-full"
        />
        
        <Select
          label="Fecha"
          options={dateRangeOptions}
          value={selectedDateRange}
          onChange={onDateRangeChange}
          className="w-full"
        />

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="w-full"
          >
            <Icon name="X" size={16} className="mr-1" />
            Limpiar
          </Button>
        </div>
      </div>

      {/* Mobile Filters */}
      {isFiltersExpanded && (
        <div className="md:hidden space-y-4 animate-accordion-down">
          <div className="grid grid-cols-1 gap-4">
            <Select
              label="Hijo"
              options={childrenOptions}
              value={selectedChild}
              onChange={onChildChange}
              className="w-full"
            />
            
            <Select
              label="Materia"
              options={subjectOptions}
              value={selectedSubject}
              onChange={onSubjectChange}
              className="w-full"
            />
            
            <Select
              label="Estado"
              options={statusOptions}
              value={selectedStatus}
              onChange={onStatusChange}
              className="w-full"
            />
            
            <Select
              label="Fecha"
              options={dateRangeOptions}
              value={selectedDateRange}
              onChange={onDateRangeChange}
              className="w-full"
            />

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={onClearFilters}
                disabled={!hasActiveFilters}
                className="flex-1"
              >
                <Icon name="X" size={16} className="mr-1" />
                Limpiar
              </Button>
              
              <Button
                variant="default"
                onClick={() => setIsFiltersExpanded(false)}
                className="flex-1"
              >
                <Icon name="Check" size={16} className="mr-1" />
                Aplicar
              </Button>
            </div>
          </div>

          {/* Mobile View Mode Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('table')}
              className="flex-1"
            >
              <Icon name="List" size={16} className="mr-1" />
              Tabla
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('calendar')}
              className="flex-1"
            >
              <Icon name="Calendar" size={16} className="mr-1" />
              Calendario
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentFilters;