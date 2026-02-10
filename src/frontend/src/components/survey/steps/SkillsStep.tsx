import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SkillsStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const skills = [
  { id: 'problem-solving', label: 'Problem-solving' },
  { id: 'creativity', label: 'Creativity' },
  { id: 'communication', label: 'Communication' },
  { id: 'analytical', label: 'Analytical thinking' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'technical', label: 'Technical skills' },
  { id: 'teamwork', label: 'Teamwork' },
  { id: 'organization', label: 'Organization' },
];

export function SkillsStep({ value, onChange }: SkillsStepProps) {
  const toggleSkill = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((s) => s !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        Select the skills you possess or want to develop (choose at least one)
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => toggleSkill(skill.id)}
          >
            <Checkbox id={skill.id} checked={value.includes(skill.id)} onCheckedChange={() => toggleSkill(skill.id)} />
            <Label htmlFor={skill.id} className="flex-1 cursor-pointer">
              {skill.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
