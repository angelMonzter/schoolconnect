import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AssignmentCalendar = ({ assignments, onAssignmentClick, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getMonthData = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days?.push(new Date(current));
      current?.setDate(current?.getDate() + 1);
    }
    
    return { days, firstDay, lastDay };
  };

  const getAssignmentsForDate = (date) => {
    const dateString = date?.toISOString()?.split('T')?.[0];
    return assignments?.filter(assignment => {
      const assignmentDate = new Date(assignment.dueDate)?.toISOString()?.split('T')?.[0];
      return assignmentDate === dateString;
    });
  };

  const getDateStatus = (date, dayAssignments) => {
    if (dayAssignments?.length === 0) return 'none';
    
    const hasOverdue = dayAssignments?.some(a => 
      new Date(a.dueDate) < new Date() && a?.status === 'pending'
    );
    const hasCompleted = dayAssignments?.some(a => a?.status === 'completed' || a?.status === 'submitted');
    const hasPending = dayAssignments?.some(a => a?.status === 'pending');
    
    if (hasOverdue) return 'overdue';
    if (hasCompleted && !hasPending) return 'completed';
    if (hasPending) return 'pending';
    return 'mixed';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-error text-error-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'mixed':
        return 'bg-secondary text-secondary-foreground';
      default:
        return '';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(newDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date, dayAssignments) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date, dayAssignments);
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date?.getMonth() === currentDate?.getMonth();
  };

  const { days } = getMonthData(currentDate);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
            className="hidden sm:flex"
          >
            <Icon name="Calendar" size={16} className="mr-1" />
            Hoy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(-1)}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(1)}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames?.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days?.map((date, index) => {
            const dayAssignments = getAssignmentsForDate(date);
            const status = getDateStatus(date, dayAssignments);
            const isCurrentMonthDay = isCurrentMonth(date);
            const isTodayDate = isToday(date);
            const isSelected = selectedDate && date?.toDateString() === selectedDate?.toDateString();

            return (
              <div
                key={index}
                className={`
                  relative p-2 min-h-[60px] border border-border rounded-lg cursor-pointer
                  transition-all duration-200 hover:bg-muted/50
                  ${isCurrentMonthDay ? 'bg-background' : 'bg-muted/20 text-muted-foreground'}
                  ${isTodayDate ? 'ring-2 ring-primary' : ''}
                  ${isSelected ? 'bg-primary/10 border-primary' : ''}
                `}
                onClick={() => handleDateClick(date, dayAssignments)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${isTodayDate ? 'text-primary' : ''}`}>
                    {date?.getDate()}
                  </span>
                  {dayAssignments?.length > 0 && (
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
                  )}
                </div>
                {/* Assignment Indicators */}
                <div className="space-y-1">
                  {dayAssignments?.slice(0, 2)?.map((assignment, idx) => (
                    <div
                      key={idx}
                      className={`
                        text-xs px-1 py-0.5 rounded truncate
                        ${assignment?.status === 'overdue' ? 'bg-error/20 text-error' : ''}
                        ${assignment?.status === 'completed' ? 'bg-success/20 text-success' : ''}
                        ${assignment?.status === 'pending' ? 'bg-warning/20 text-warning' : ''}
                        ${assignment?.status === 'submitted' ? 'bg-primary/20 text-primary' : ''}
                      `}
                      title={`${assignment?.subject}: ${assignment?.title}`}
                    >
                      {assignment?.title}
                    </div>
                  ))}
                  {dayAssignments?.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{dayAssignments?.length - 2} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Selected Date Details */}
      {selectedDate && (
        <div className="border-t border-border p-4 bg-muted/20">
          <h4 className="font-medium text-foreground mb-3">
            Tareas para {selectedDate?.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          {getAssignmentsForDate(selectedDate)?.length > 0 ? (
            <div className="space-y-2">
              {getAssignmentsForDate(selectedDate)?.map((assignment) => (
                <div
                  key={assignment?.id}
                  className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => onAssignmentClick(assignment)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        {assignment?.subject}
                      </span>
                      <div className={`
                        inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                        ${assignment?.status === 'overdue' ? 'bg-error/10 text-error' : ''}
                        ${assignment?.status === 'completed' ? 'bg-success/10 text-success' : ''}
                        ${assignment?.status === 'pending' ? 'bg-warning/10 text-warning' : ''}
                        ${assignment?.status === 'submitted' ? 'bg-primary/10 text-primary' : ''}
                      `}>
                        {assignment?.status === 'overdue' && 'Atrasada'}
                        {assignment?.status === 'completed' && 'Completada'}
                        {assignment?.status === 'pending' && 'Pendiente'}
                        {assignment?.status === 'submitted' && 'Entregada'}
                      </div>
                    </div>
                    <div className="font-medium text-foreground">{assignment?.title}</div>
                    <div className="text-sm text-muted-foreground">{assignment?.studentName}</div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No hay tareas programadas para esta fecha.
            </p>
          )}
        </div>
      )}
      {/* Legend */}
      <div className="border-t border-border p-4 bg-muted/10">
        <h5 className="font-medium text-foreground mb-2">Leyenda</h5>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Completadas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Pendientes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-muted-foreground">Atrasadas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-muted-foreground">Mixtas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCalendar;