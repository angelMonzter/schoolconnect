import React from 'react';
import Icon from '../../../components/AppIcon';

const AssignmentStats = ({ assignments, selectedChild }) => {
  const getFilteredAssignments = () => {
    if (selectedChild === 'all') return assignments;
    return assignments?.filter(assignment => assignment?.childId === selectedChild);
  };

  const filteredAssignments = getFilteredAssignments();

  const stats = {
    total: filteredAssignments?.length,
    pending: filteredAssignments?.filter(a => a?.status === 'pending')?.length,
    completed: filteredAssignments?.filter(a => a?.status === 'completed')?.length,
    submitted: filteredAssignments?.filter(a => a?.status === 'submitted')?.length,
    graded: filteredAssignments?.filter(a => a?.status === 'graded')?.length,
    overdue: filteredAssignments?.filter(a => 
      new Date(a.dueDate) < new Date() && a?.status === 'pending'
    )?.length
  };

  const completionRate = stats?.total > 0 
    ? Math.round(((stats?.completed + stats?.submitted + stats?.graded) / stats?.total) * 100)
    : 0;

  const upcomingDeadlines = filteredAssignments?.filter(a => {
      const dueDate = new Date(a.dueDate);
      const today = new Date();
      const threeDaysFromNow = new Date();
      threeDaysFromNow?.setDate(today?.getDate() + 3);
      return dueDate >= today && dueDate <= threeDaysFromNow && a?.status === 'pending';
    })?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const statCards = [
    {
      title: 'Total de Tareas',
      value: stats?.total,
      icon: 'BookOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Pendientes',
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Completadas',
      value: stats?.completed + stats?.submitted + stats?.graded,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Atrasadas',
      value: stats?.overdue,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat?.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Rate */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Tasa de Finalización
            </h3>
            <div className="text-2xl font-bold text-primary">{completionRate}%</div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3 mb-4">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium text-success">{stats?.completed + stats?.submitted + stats?.graded}</div>
              <div className="text-muted-foreground">Completadas</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-warning">{stats?.pending}</div>
              <div className="text-muted-foreground">Pendientes</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-error">{stats?.overdue}</div>
              <div className="text-muted-foreground">Atrasadas</div>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Próximas Fechas Límite
            </h3>
            <Icon name="Calendar" size={20} className="text-muted-foreground" />
          </div>
          
          {upcomingDeadlines?.length > 0 ? (
            <div className="space-y-3">
              {upcomingDeadlines?.slice(0, 4)?.map((assignment) => {
                const dueDate = new Date(assignment.dueDate);
                const today = new Date();
                const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={assignment?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">{assignment?.title}</div>
                      <div className="text-xs text-muted-foreground">{assignment?.subject}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${daysUntilDue <= 1 ? 'text-error' : 'text-warning'}`}>
                        {daysUntilDue === 0 ? 'Hoy' : 
                         daysUntilDue === 1 ? 'Mañana' : 
                         `${daysUntilDue} días`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {dueDate?.toLocaleDateString('es-ES', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {upcomingDeadlines?.length > 4 && (
                <div className="text-center text-sm text-muted-foreground pt-2">
                  +{upcomingDeadlines?.length - 4} tareas más próximas
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-2" />
              <p className="text-sm text-muted-foreground">
                No hay tareas con fechas límite próximas
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Subject Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Distribución por Materia
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(
            filteredAssignments?.reduce((acc, assignment) => {
              if (!acc?.[assignment?.subject]) {
                acc[assignment.subject] = { total: 0, completed: 0, pending: 0, overdue: 0 };
              }
              acc[assignment.subject].total++;
              
              if (assignment?.status === 'completed' || assignment?.status === 'submitted' || assignment?.status === 'graded') {
                acc[assignment.subject].completed++;
              } else if (assignment?.status === 'pending') {
                if (new Date(assignment.dueDate) < new Date()) {
                  acc[assignment.subject].overdue++;
                } else {
                  acc[assignment.subject].pending++;
                }
              }
              
              return acc;
            }, {})
          )?.map(([subject, data]) => {
            const completionRate = data?.total > 0 ? Math.round((data?.completed / data?.total) * 100) : 0;
            
            return (
              <div key={subject} className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{subject}</h4>
                  <span className="text-xs text-muted-foreground">{data?.total} tareas</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{completionRate}% completado</span>
                  {data?.overdue > 0 && (
                    <span className="text-error">{data?.overdue} atrasadas</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssignmentStats;