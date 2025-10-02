import React from 'react';
import Button from '../../../components/ui/Button';

const SubjectTabs = ({ subjects, activeSubject, onSubjectChange }) => {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex space-x-1 p-1 min-w-max">
          {subjects?.map((subject) => (
            <Button
              key={subject?.id}
              variant={activeSubject === subject?.id ? "default" : "ghost"}
              onClick={() => onSubjectChange(subject?.id)}
              className="px-4 py-2 text-sm font-medium whitespace-nowrap"
            >
              {subject?.name}
              {subject?.hasNewGrades && (
                <div className="ml-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectTabs;