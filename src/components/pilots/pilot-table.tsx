'use client';

import { useState, useMemo } from 'react';
import { pilots as allPilots } from '@/lib/data';
import type { Pilot, PilotStatus } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '../ui/card';

const pilotStatuses: PilotStatus[] = ['Available', 'On Mission', 'On Leave', 'Unavailable'];

function getStatusBadgeVariant(status: PilotStatus) {
  switch (status) {
    case 'Available':
      return 'default';
    case 'On Mission':
      return 'secondary';
    case 'On Leave':
      return 'outline';
    case 'Unavailable':
      return 'destructive';
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

export function PilotTable() {
  const [pilots, setPilots] = useState<Pilot[]>(allPilots);
  const [filters, setFilters] = useState({
    skill: '',
    certification: '',
    location: '',
  });

  const handleFilterChange = (key: 'skill' | 'certification' | 'location', value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleStatusChange = (pilotId: string, newStatus: PilotStatus) => {
    setPilots((prevPilots) =>
      prevPilots.map((pilot) =>
        pilot.id === pilotId ? { ...pilot, status: newStatus } : pilot
      )
    );
  };

  const filteredPilots = useMemo(() => {
    return pilots.filter((pilot) => {
      const skillMatch = filters.skill
        ? pilot.skills.some((s) => s.toLowerCase().includes(filters.skill.toLowerCase()))
        : true;
      const certMatch = filters.certification
        ? pilot.certifications.some((c) =>
            c.toLowerCase().includes(filters.certification.toLowerCase())
          )
        : true;
      const locationMatch = filters.location
        ? pilot.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      return skillMatch && certMatch && locationMatch;
    });
  }, [pilots, filters]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Filter by skill..."
          value={filters.skill}
          onChange={(e) => handleFilterChange('skill', e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Filter by certification..."
          value={filters.certification}
          onChange={(e) => handleFilterChange('certification', e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Filter by location..."
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="max-w-xs"
        />
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pilot</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Certifications</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPilots.map((pilot) => (
              <TableRow key={pilot.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={pilot.avatarUrl} alt={pilot.name} data-ai-hint="person portrait" />
                      <AvatarFallback>{getInitials(pilot.name)}</AvatarFallback>
                    </Avatar>
                    <span>{pilot.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {pilot.skills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {pilot.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary">{cert}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{pilot.location}</TableCell>
                <TableCell>
                  <Select
                    value={pilot.status}
                    onValueChange={(newStatus: PilotStatus) => handleStatusChange(pilot.id, newStatus)}
                  >
                    <SelectTrigger className="w-[150px]">
                       <SelectValue>
                         <Badge variant={getStatusBadgeVariant(pilot.status)}>{pilot.status}</Badge>
                       </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {pilotStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
