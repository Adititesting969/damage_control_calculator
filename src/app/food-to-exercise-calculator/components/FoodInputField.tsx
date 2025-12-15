'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FoodInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onVoiceInput: () => void;
  isListening: boolean;
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const FoodInputField = ({
  value,
  onChange,
  onVoiceInput,
  isListening,
  suggestions,
  onSelectSuggestion,
}: FoodInputFieldProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowSuggestions(suggestions.length > 0 && value.length > 0);
  }, [suggestions, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="What did you eat? (e.g., big mac and large fries)"
          className="w-full px-4 py-3 pr-12 text-base bg-card border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-quick"
          aria-label="Food input field"
        />
        <button
          type="button"
          onClick={onVoiceInput}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-quick hover-lift ${
            isListening
              ? 'bg-primary text-primary-foreground animate-pulse-soft'
              : 'bg-muted text-muted-foreground hover:bg-accent'
          }`}
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        >
          <Icon name="MicrophoneIcon" size={20} />
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left text-sm hover:bg-muted transition-quick focus:outline-none focus:bg-muted"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodInputField;