import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ items = [] }) => {
  const navigate = useNavigate();

  if (!items || items?.length === 0) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items?.map((item, index) => {
          const isLast = index === items?.length - 1;
          const isClickable = item?.path && !isLast;

          return (
            <li key={index} className="flex items-center space-x-2">
              {index > 0 && (
                <Icon name="ChevronRight" size={16} className="text-muted-foreground/60" />
              )}
              {isClickable ? (
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation(item?.path)}
                  className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item?.icon && (
                    <Icon name={item?.icon} size={16} className="mr-1" />
                  )}
                  {item?.label}
                </Button>
              ) : (
                <span className={`flex items-center ${isLast ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {item?.icon && (
                    <Icon name={item?.icon} size={16} className="mr-1" />
                  )}
                  {item?.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;