import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  maxCount = 99, 
  showZero = false, 
  variant = 'default',
  size = 'default',
  className = '',
  onClick 
}) => {
  if (!showZero && count === 0) {
    return null;
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-accent text-accent-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-1 py-0.5 min-w-[16px] h-[16px]';
      case 'lg':
        return 'text-sm px-2 py-1 min-w-[24px] h-[24px]';
      default:
        return 'text-xs px-1.5 py-0.5 min-w-[18px] h-[18px]';
    }
  };

  const displayCount = count > maxCount ? `${maxCount}+` : count;

  const badgeClasses = `
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-all duration-200
    animate-bounce-gentle
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${onClick ? 'cursor-pointer hover:scale-110' : ''}
    ${className}
  `?.trim();

  return (
    <span 
      className={badgeClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e?.key === 'Enter' || e?.key === ' ') {
          e?.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;