import type { Metadata } from 'next';
import AppHeader from '@/components/common/AppHeader';
import FoodCalculatorInteractive from './components/FoodCalculatorInteractive';

export const metadata: Metadata = {
  title: 'Food to Exercise Calculator - Damage Control',
  description: 'Convert your food intake into exercise equivalents with personalized motivational messaging to understand the commitment needed to burn consumed calories.',
};

export default function FoodToExerciseCalculatorPage() {
  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Damage Control Calculator
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Find out how much exercise you need to burn off what you just ate. Choose your
                motivation style and face the truth.
              </p>
            </div>

            <FoodCalculatorInteractive />

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">How It Works</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>
                    Type what you ate or use voice input (e.g., &quot;big mac and large fries&quot;)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Choose your motivation style: Gentle, Honest, or Brutal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>
                    See how long you need to walk, run, cycle, or swim to burn those calories
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}