import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface PersonalityStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const traits = [
  { id: 'introvert', label: 'Introvert', description: 'Prefer working independently or in small groups' },
  { id: 'extrovert', label: 'Extrovert', description: 'Energized by working with others' },
  { id: 'leadership', label: 'Leadership-oriented', description: 'Enjoy guiding and managing teams' },
  { id: 'detail-oriented', label: 'Detail-oriented', description: 'Focus on precision and accuracy' },
  { id: 'big-picture', label: 'Big-picture thinker', description: 'Focus on strategy and vision' },
  { id: 'adaptable', label: 'Adaptable', description: 'Comfortable with change and new situations' },
];

export function PersonalityStep({ value, onChange }: PersonalityStepProps) {
  const toggleTrait = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((t) => t !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        Select the personality traits that best describe you (choose at least one)
      </p>
      <div className="grid gap-4">
        {traits.map((trait) => (
          <div
            key={trait.id}
            className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => toggleTrait(trait.id)}
          >
            <Checkbox id={trait.id} checked={value.includes(trait.id)} onCheckedChange={() => toggleTrait(trait.id)} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor={trait.id} className="font-medium cursor-pointer">
                {trait.label}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">{trait.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
