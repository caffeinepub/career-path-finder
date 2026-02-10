import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface WorkEnvironmentStepProps {
  value: string;
  onChange: (value: string) => void;
}

const environments = [
  { id: 'office', label: 'Office', description: 'Traditional office setting with colleagues' },
  { id: 'remote', label: 'Remote', description: 'Work from home or anywhere' },
  { id: 'field', label: 'Field work', description: 'On-site, outdoor, or travel-based work' },
  { id: 'hybrid', label: 'Hybrid', description: 'Mix of office and remote work' },
];

export function WorkEnvironmentStep({ value, onChange }: WorkEnvironmentStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">What type of work environment do you prefer?</p>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        {environments.map((env) => (
          <div
            key={env.id}
            className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => onChange(env.id)}
          >
            <RadioGroupItem value={env.id} id={env.id} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor={env.id} className="font-medium cursor-pointer">
                {env.label}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">{env.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
