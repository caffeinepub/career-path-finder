import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { GraduationCap, Lightbulb, CheckCircle2 } from 'lucide-react';
import type { CareerMatchExplanation } from '../../backend';

interface RecommendationCardProps {
  recommendation: CareerMatchExplanation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <Card className="transition-all duration-250 hover:shadow-soft-lg hover:-translate-y-0.5 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-start gap-2 text-base">
          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
          <span className="line-clamp-2">{recommendation.careerTitle}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground line-clamp-3">{recommendation.description}</p>

        <Separator />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-chart-1" />
            <h4 className="font-semibold text-sm">Required Skills</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendation.requiredSkills.slice(0, 4).map((skill, idx) => (
              <Badge 
                key={idx} 
                variant="secondary"
                className="transition-all duration-200 hover:scale-[1.02] hover:shadow-soft text-xs"
              >
                {skill}
              </Badge>
            ))}
            {recommendation.requiredSkills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{recommendation.requiredSkills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-4 w-4 text-chart-2" />
            <h4 className="font-semibold text-sm">Typical Education</h4>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{recommendation.typicalEducation}</p>
        </div>

        <Separator />

        <div className="bg-primary/5 rounded-lg p-3 transition-all duration-200 hover:bg-primary/8">
          <h4 className="font-semibold text-sm mb-2">Why This Matches You</h4>
          <p className="text-sm text-muted-foreground line-clamp-3">{recommendation.matchReasons}</p>
        </div>
      </CardContent>
    </Card>
  );
}
