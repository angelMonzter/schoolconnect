import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const getPerformanceColor = (value, type) => {
    if (type === 'grade') {
      if (value >= 8) return 'text-success';
      if (value >= 6) return 'text-warning';
      return 'text-error';
    }
    if (type === 'completion') {
      if (value >= 90) return 'text-success';
      if (value >= 70) return 'text-warning';
      return 'text-error';
    }
    return 'text-foreground';
  };

  const getPerformanceIcon = (value, type) => {
    if (type === 'grade') {
      if (value >= 8) return 'TrendingUp';
      if (value >= 6) return 'Minus';
      return 'TrendingDown';
    }
    if (type === 'completion') {
      if (value >= 90) return 'CheckCircle';
      if (value >= 70) return 'Clock';
      return 'AlertCircle';
    }
    return 'BarChart3';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Promedio General</p>
            <p className={`text-2xl font-bold ${getPerformanceColor(metrics?.averageGrade, 'grade')}`}>
              {metrics?.averageGrade?.toFixed(1)}/10
            </p>
          </div>
          <div className={`p-2 rounded-full bg-muted ${getPerformanceColor(metrics?.averageGrade, 'grade')}`}>
            <Icon name={getPerformanceIcon(metrics?.averageGrade, 'grade')} size={20} />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <Icon name="Calendar" size={12} className="mr-1 text-muted-foreground" />
          <span className="text-muted-foreground">Último mes</span>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tareas Completadas</p>
            <p className={`text-2xl font-bold ${getPerformanceColor(metrics?.completionRate, 'completion')}`}>
              {metrics?.completionRate}%
            </p>
          </div>
          <div className={`p-2 rounded-full bg-muted ${getPerformanceColor(metrics?.completionRate, 'completion')}`}>
            <Icon name={getPerformanceIcon(metrics?.completionRate, 'completion')} size={20} />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <span className="text-muted-foreground">{metrics?.completedAssignments} de {metrics?.totalAssignments} tareas</span>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Posición en Clase</p>
            <p className="text-2xl font-bold text-foreground">
              {metrics?.classRank}º/{metrics?.totalStudents}
            </p>
          </div>
          <div className="p-2 rounded-full bg-muted">
            <Icon name="Users" size={20} className="text-primary" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <Icon name="Award" size={12} className="mr-1 text-muted-foreground" />
          <span className="text-muted-foreground">Top {Math.round((metrics?.classRank / metrics?.totalStudents) * 100)}%</span>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tendencia</p>
            <p className={`text-2xl font-bold ${metrics?.trend > 0 ? 'text-success' : metrics?.trend < 0 ? 'text-error' : 'text-muted-foreground'}`}>
              {metrics?.trend > 0 ? '+' : ''}{metrics?.trend?.toFixed(1)}
            </p>
          </div>
          <div className={`p-2 rounded-full bg-muted ${metrics?.trend > 0 ? 'text-success' : metrics?.trend < 0 ? 'text-error' : 'text-muted-foreground'}`}>
            <Icon name={metrics?.trend > 0 ? 'TrendingUp' : metrics?.trend < 0 ? 'TrendingDown' : 'Minus'} size={20} />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <span className="text-muted-foreground">vs. mes anterior</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;