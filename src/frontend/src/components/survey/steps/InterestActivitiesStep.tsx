import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BarChart3, Hammer, Users, TrendingUp, Sparkles, FolderKanban } from 'lucide-react';

interface InterestActivitiesStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const activities = [
  { id: 'analyzing-data', label: 'Analyzing data and finding patterns', icon: BarChart3 },
  { id: 'building-creating', label: 'Building or creating things', icon: Hammer },
  { id: 'helping-people', label: 'Helping and supporting people', icon: Users },
  { id: 'persuading-influencing', label: 'Persuading and influencing others', icon: TrendingUp },
  { id: 'creative-expression', label: 'Creative expression and design', icon: Sparkles },
  { id: 'organizing-planning', label: 'Organizing and planning projects', icon: FolderKanban },
];

export function InterestActivitiesStep({ value, onChange }: InterestActivitiesStepProps) {
  const toggleActivity = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((a) => a !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        Select the activities or tasks you enjoy most (choose at least one)
      </p>
      <div className="grid gap-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => toggleActivity(activity.id)}
            >
              <Checkbox
                id={activity.id}
                checked={value.includes(activity.id)}
                onCheckedChange={() => toggleActivity(activity.id)}
              />
              <Icon className="h-5 w-5 text-primary" />
              <Label htmlFor={activity.id} className="flex-1 cursor-pointer">
                {activity.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
