'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Exercise {
  type: string;
  icon: string;
  duration: {
    hours: number;
    minutes: number;
  };
  message: string;
}

interface ExerciseCardProps {
  calories: number;
  exercises: Exercise[];
  tone: 'gentle' | 'honest' | 'brutal';
  foodName?: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ calories, exercises, tone, foodName }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const formatDuration = (hours: number, minutes: number): string => {
    if (hours === 0) {
      return `${minutes} min`;
    }
    if (minutes === 0) {
      return `${hours} hr`;
    }
    return `${hours} hr ${minutes} min`;
  };

  return (
    <div className="space-y-4 animate-fade-in-up">
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        {foodName && (
          <div className="mb-4 pb-4 border-b border-border">
            <p className="text-sm text-muted-foreground">You ate</p>
            <p className="text-lg font-semibold text-foreground capitalize">{foodName}</p>
          </div>
        )}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground mb-1">Total Calories</p>
          <p className="text-4xl font-bold text-foreground">{calories.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">kcal</p>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Exercise Equivalents</h3>
          
          {exercises.map((exercise, index) => (
            <div
              key={exercise.type}
              className={`flex items-start gap-4 p-4 bg-muted/50 rounded-xl transition-all duration-300 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={exercise.icon as any} size={24} className="text-primary" />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-foreground capitalize">
                    {exercise.type}
                  </h4>
                  <span className="text-sm font-medium text-primary">
                    {formatDuration(exercise.duration.hours, exercise.duration.minutes)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exercise.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;