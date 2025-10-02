import React, { useState } from 'react';
import Select from './Select';
import Icon from '../AppIcon';
import Button from './Button';

const MultiChildSelector = ({ 
  selectedChild, 
  onChildChange, 
  children = [],
  className = '',
  variant = 'default' // 'default', 'compact', 'mobile'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultChildren = [
    { 
      value: 'child1', 
      label: 'María González', 
      grade: '5° Grado',
      avatar: null,
      notifications: 3
    },
    { 
      value: 'child2', 
      label: 'Carlos González', 
      grade: '3° Grado',
      avatar: null,
      notifications: 1
    },
    { 
      value: 'child3', 
      label: 'Ana González', 
      grade: '1° Grado',
      avatar: null,
      notifications: 0
    }
  ];

  const childrenData = children?.length > 0 ? children : defaultChildren;
  
  const selectOptions = childrenData?.map(child => ({
    value: child?.value,
    label: `${child?.label} (${child?.grade})`,
    description: child?.grade
  }));

  const selectedChildData = childrenData?.find(child => child?.value === selectedChild);

  if (variant === 'mobile') {
    return (
      <div className={`w-full ${className}`}>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Seleccionar Hijo</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
          
          {isExpanded && (
            <div className="space-y-2 animate-accordion-down">
              {childrenData?.map((child) => (
                <Button
                  key={child?.value}
                  variant={selectedChild === child?.value ? "default" : "ghost"}
                  onClick={() => {
                    onChildChange(child?.value);
                    setIsExpanded(false);
                  }}
                  className="w-full justify-start p-3"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{child?.label}</div>
                      <div className="text-xs text-muted-foreground">{child?.grade}</div>
                    </div>
                    {child?.notifications > 0 && (
                      <div className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                        {child?.notifications}
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <Select
          options={selectOptions}
          value={selectedChild}
          onChange={onChildChange}
          placeholder="Hijo"
          className="min-w-[160px]"
        />
        {selectedChildData && selectedChildData?.notifications > 0 && (
          <div className="absolute -top-1 -right-1 z-notification-badge">
            <div className="bg-accent text-accent-foreground text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
              {selectedChildData?.notifications}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Select
        options={selectOptions}
        value={selectedChild}
        onChange={onChildChange}
        placeholder="Seleccionar hijo"
        className="min-w-[200px]"
        label="Hijo Activo"
      />
      {selectedChildData && selectedChildData?.notifications > 0 && (
        <div className="absolute -top-1 -right-1 z-notification-badge">
          <div className="bg-accent text-accent-foreground text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-bounce-gentle">
            {selectedChildData?.notifications > 99 ? '99+' : selectedChildData?.notifications}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiChildSelector;