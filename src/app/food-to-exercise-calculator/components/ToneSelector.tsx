'use client';

interface ToneSelectorProps {
  selectedTone: 'gentle' | 'honest' | 'brutal';
  onToneChange: (tone: 'gentle' | 'honest' | 'brutal') => void;
}

const ToneSelector = ({ selectedTone, onToneChange }: ToneSelectorProps) => {
  const tones: Array<{ value: 'gentle' | 'honest' | 'brutal'; label: string }> = [
    { value: 'gentle', label: 'Gentle' },
    { value: 'honest', label: 'Honest' },
    { value: 'brutal', label: 'Brutal' },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {tones.map((tone) => (
        <button
          key={tone.value}
          type="button"
          onClick={() => onToneChange(tone.value)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-quick hover-lift ${
            selectedTone === tone.value
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted text-muted-foreground hover:bg-accent'
          }`}
          aria-label={`Select ${tone.label} tone`}
          aria-pressed={selectedTone === tone.value}
        >
          {tone.label}
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;