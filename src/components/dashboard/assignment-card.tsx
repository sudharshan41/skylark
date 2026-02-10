import Image from 'next/image';
import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  User,
} from 'lucide-react';
import type { Assignment } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

function getStatusBadgeVariant(status: Assignment['status']) {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Upcoming':
      return 'secondary';
    case 'Completed':
      return 'outline';
    default:
      return 'default';
  }
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

export function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const startDate = new Date(assignment.startTime);
  const endDate = new Date(assignment.endTime);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="font-headline">{assignment.project.name}</CardTitle>
          <Badge variant={getStatusBadgeVariant(assignment.status)} className="shrink-0">
            {assignment.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1">
          <MapPin className="h-4 w-4" />
          {assignment.project.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={assignment.pilot.avatarUrl} alt={assignment.pilot.name} data-ai-hint="person portrait" />
            <AvatarFallback>{getInitials(assignment.pilot.name)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">{assignment.pilot.name}</p>
            <p className="text-muted-foreground">Pilot</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
            <Package className="h-5 w-5 text-muted-foreground"/>
          </div>
          <div className="text-sm">
            <p className="font-medium">{assignment.drone.model}</p>
            <p className="text-muted-foreground">Drone</p>
          </div>
        </div>
      </CardContent>
      <Separator className="my-0" />
      <CardFooter className="flex-col items-start gap-2 p-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{startDate.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>
            {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
            {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
