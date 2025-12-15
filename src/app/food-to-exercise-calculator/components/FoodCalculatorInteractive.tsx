'use client';

import { useState, useEffect } from 'react';
import FoodInputField from './FoodInputField';
import ToneSelector from './ToneSelector';
import CalculateButton from './CalculateButton';
import ExerciseCard from './ExerciseCard';
import ErrorMessage from './ErrorMessage';
import LoadingSkeleton from './LoadingSkeleton';

interface Exercise {
  type: string;
  icon: string;
  duration: {
    hours: number;
    minutes: number;
  };
  message: string;
}

interface CalculationResult {
  calories: number;
  exercises: Exercise[];
  foodName?: string;
}

const FoodCalculatorInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [foodInput, setFoodInput] = useState('');
  const [selectedTone, setSelectedTone] = useState<'gentle' | 'honest' | 'brutal'>('honest');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleCalculate = async () => {
    setError('');
    setResult(null);

    if (!foodInput.trim()) {
      setError('Please enter what you ate before calculating.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/calculate-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foodInput: foodInput.trim(),
          tone: selectedTone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to calculate. Please try again.');
        setIsLoading(false);
        return;
      }

      // Parse the duration strings (e.g., "1 hr 30 min")
      const parseDuration = (durationStr: string) => {
        const match = durationStr.match(/(\d+)\s*hr\s*(\d+)\s*min/);
        if (match) {
          return { hours: parseInt(match[1]), minutes: parseInt(match[2]) };
        }
        const minMatch = durationStr.match(/(\d+)\s*min/);
        if (minMatch) {
          return { hours: 0, minutes: parseInt(minMatch[1]) };
        }
        return { hours: 0, minutes: 0 };
      };

      const iconMap: Record<string, string> = {
        walking: 'UserIcon',
        running: 'BoltIcon',
        cycling: 'TruckIcon',
        swimming: 'BeakerIcon',
      };

      const exercises: Exercise[] = Object.entries(data.activities).map(
        ([type, durationStr]) => ({
          type,
          icon: iconMap[type] || 'UserIcon',
          duration: parseDuration(durationStr as string),
          message: data.message,
        })
      );

      setResult({
        calories: data.calories,
        exercises,
        foodName: data.food,
      });
    } catch (err: any) {
      console.error('Calculation error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!isHydrated) return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Voice input is not supported in your browser. Please type instead.');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setFoodInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setError('Voice input failed. Please try again or type instead.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setFoodInput(suggestion);
    setSuggestions([]);
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6 px-4">
        <div className="space-y-4">
          <div className="h-12 bg-muted rounded-xl animate-pulse-soft" />
          <div className="h-10 bg-muted rounded-full animate-pulse-soft" />
          <div className="h-14 bg-muted rounded-xl animate-pulse-soft" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 px-4">
      <div className="space-y-4">
        <FoodInputField
          value={foodInput}
          onChange={setFoodInput}
          onVoiceInput={handleVoiceInput}
          isListening={isListening}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />

        <ToneSelector selectedTone={selectedTone} onToneChange={setSelectedTone} />

        <CalculateButton
          onClick={handleCalculate}
          disabled={!foodInput.trim()}
          isLoading={isLoading}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      {isLoading && <LoadingSkeleton />}

      {result && !isLoading && (
        <ExerciseCard calories={result.calories} exercises={result.exercises} tone={selectedTone} />
      )}
    </div>
  );
};

export default FoodCalculatorInteractive;