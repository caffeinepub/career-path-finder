import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Code, Briefcase, Palette, Heart, GraduationCap, Wrench } from 'lucide-react';

interface InterestsStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const interests = [
  { id: 'technology', label: 'Technology & IT', icon: Code },
  { id: 'business', label: 'Business & Management', icon: Briefcase },
  { id: 'design', label: 'Design & Creative Arts', icon: Palette },
  { id: 'healthcare', label: 'Healthcare & Medicine', icon: Heart },
  { id: 'education', label: 'Education & Training', icon: GraduationCap },
  { id: 'engineering', label: 'Engineering & Manufacturing', icon: Wrench },
];

export function InterestsStep({ value, onChange }: InterestsStepProps) {
  const toggleInterest = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((i) => i !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">Select all areas that interest you (choose at least one)</p>
      <div className="grid gap-4">
        {interests.map((interest) => {
          const Icon = interest.icon;
          return (
            <div
              key={interest.id}
              className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => toggleInterest(interest.id)}
            >
              <Checkbox id={interest.id} checked={value.includes(interest.id)} onCheckedChange={() => toggleInterest(interest.id)} />
              <Icon className="h-5 w-5 text-primary" />
              <Label htmlFor={interest.id} className="flex-1 cursor-pointer">
                {interest.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
