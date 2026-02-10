import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface LearningStyleStepProps {
  value: string;
  onChange: (value: string) => void;
}

const styles = [
  { id: 'theoretical', label: 'Theoretical', description: 'Learning through concepts, theories, and reading' },
  { id: 'practical', label: 'Practical', description: 'Learning through real-world applications and examples' },
  { id: 'hands-on', label: 'Hands-on', description: 'Learning by doing and experimenting' },
  { id: 'visual', label: 'Visual', description: 'Learning through diagrams, videos, and demonstrations' },
];

export function LearningStyleStep({ value, onChange }: LearningStyleStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">How do you prefer to learn new things?</p>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        {styles.map((style) => (
          <div
            key={style.id}
            className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => onChange(style.id)}
          >
            <RadioGroupItem value={style.id} id={style.id} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor={style.id} className="font-medium cursor-pointer">
                {style.label}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">{style.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
