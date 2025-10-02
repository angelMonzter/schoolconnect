import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onExportReport, 
  onResetFilters 
}) => {
  const dateRangeOptions = [
    { value: 'last_week', label: 'Última semana' },
    { value: 'last_month', label: 'Último mes' },
    { value: 'last_quarter', label: 'Último trimestre' },
    { value: 'current_year', label: 'Año actual' },
    { value: 'all_time', label: 'Todo el tiempo' }
  ];

  const assignmentTypeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'homework', label: 'Tareas' },
    { value: 'exam', label: 'Exámenes' },
    { value: 'project', label: 'Proyectos' },
    { value: 'quiz', label: 'Cuestionarios' },
    { value: 'presentation', label: 'Presentaciones' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'completed', label: 'Completadas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'late', label: 'Entregadas tarde' },
    { value: 'missing', label: 'No entregadas' }
  ];

  const gradeRangeOptions = [
    { value: 'all', label: 'Todas las calificaciones' },
    { value: 'excellent', label: 'Excelente (9-10)' },
    { value: 'good', label: 'Bueno (7-8)' },
    { value: 'satisfactory', label: 'Satisfactorio (6-7)' },
    { value: 'needs_improvement', label: 'Necesita mejorar (&lt;6)' },
    { value: 'ungraded', label: 'Sin calificar' }
  ];

  const hasActiveFilters = () => {
    return filters?.dateRange !== 'current_year' || 
           filters?.assignmentType !== 'all' || 
           filters?.status !== 'all' || 
           filters?.gradeRange !== 'all';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filtros y Controles</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              iconName="RotateCcw"
              iconSize={16}
            >
              Limpiar Filtros
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onExportReport}
            iconName="Download"
            iconSize={16}
          >
            Exportar Reporte
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Período de Tiempo"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => onFilterChange('dateRange', value)}
          className="w-full"
        />

        <Select
          label="Tipo de Asignación"
          options={assignmentTypeOptions}
          value={filters?.assignmentType}
          onChange={(value) => onFilterChange('assignmentType', value)}
          className="w-full"
        />

        <Select
          label="Estado"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          className="w-full"
        />

        <Select
          label="Rango de Calificación"
          options={gradeRangeOptions}
          value={filters?.gradeRange}
          onChange={(value) => onFilterChange('gradeRange', value)}
          className="w-full"
        />
      </div>
      {hasActiveFilters() && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={16} className="text-primary" />
            <span className="text-foreground font-medium">Filtros activos:</span>
            <div className="flex flex-wrap gap-2">
              {filters?.dateRange !== 'current_year' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}
                </span>
              )}
              {filters?.assignmentType !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {assignmentTypeOptions?.find(opt => opt?.value === filters?.assignmentType)?.label}
                </span>
              )}
              {filters?.status !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
                </span>
              )}
              {filters?.gradeRange !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {gradeRangeOptions?.find(opt => opt?.value === filters?.gradeRange)?.label}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;