'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    setIsShaking(true);
    const timer = setTimeout(() => setIsShaking(false), 200);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`w-full bg-error/10 border-2 border-error rounded-xl p-4 flex items-start gap-3 ${
        isShaking ? 'animate-gentle-shake' : ''
      }`}
    >
      <Icon name="ExclamationTriangleIcon" size={24} className="text-error flex-shrink-0" />
      <p className="text-sm text-error font-medium">{message}</p>
    </div>
  );
};

export default ErrorMessage;