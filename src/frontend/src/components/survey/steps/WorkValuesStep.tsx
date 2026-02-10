import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield, Zap, Target, Palette, Crown, Shuffle } from 'lucide-react';

interface WorkValuesStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const workValues = [
  { id: 'stability', label: 'Job stability and security', icon: Shield },
  { id: 'autonomy', label: 'Independence and autonomy', icon: Zap },
  { id: 'impact', label: 'Making a meaningful impact', icon: Target },
  { id: 'creativity', label: 'Creative freedom', icon: Palette },
  { id: 'leadership', label: 'Leadership opportunities', icon: Crown },
  { id: 'variety', label: 'Variety and new challenges', icon: Shuffle },
];

export function WorkValuesStep({ value, onChange }: WorkValuesStepProps) {
  const toggleValue = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        Select what matters most to you in a career (choose at least one)
      </p>
      <div className="grid gap-4">
        {workValues.map((workValue) => {
          const Icon = workValue.icon;
          return (
            <div
              key={workValue.id}
              className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => toggleValue(workValue.id)}
            >
              <Checkbox
                id={workValue.id}
                checked={value.includes(workValue.id)}
                onCheckedChange={() => toggleValue(workValue.id)}
              />
              <Icon className="h-5 w-5 text-primary" />
              <Label htmlFor={workValue.id} className="flex-1 cursor-pointer">
                {workValue.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
