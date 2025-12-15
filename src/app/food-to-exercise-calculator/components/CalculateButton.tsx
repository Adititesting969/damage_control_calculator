'use client';

interface CalculateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const CalculateButton = ({ onClick, disabled, isLoading }: CalculateButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full px-6 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-xl transition-quick hover-lift hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label="Calculate the damage"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          Calculating...
        </span>
      ) : (
        'Calculate the Damage'
      )}
    </button>
  );
};

export default CalculateButton;