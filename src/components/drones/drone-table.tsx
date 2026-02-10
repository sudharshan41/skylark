'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { drones as allDrones } from '@/lib/data';
import type { Drone, DroneStatus } from '@/lib/types';
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
import { Badge } from '@/components/ui/badge';
import { Card } from '../ui/card';

const droneStatuses: DroneStatus[] = ['Available', 'On Mission', 'In Maintenance'];

function getStatusBadgeVariant(status: DroneStatus) {
  switch (status) {
    case 'Available':
      return 'default';
    case 'On Mission':
      return 'secondary';
    case 'In Maintenance':
      return 'destructive';
    default:
      return 'default';
  }
}

export function DroneTable() {
  const [drones, setDrones] = useState<Drone[]>(allDrones);
  const [filters, setFilters] = useState({
    capability: '',
    location: '',
  });

  const handleFilterChange = (key: 'capability' | 'location', value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleStatusChange = (droneId: string, newStatus: DroneStatus) => {
    setDrones((prevDrones) =>
      prevDrones.map((drone) =>
        drone.id === droneId ? { ...drone, status: newStatus } : drone
      )
    );
  };

  const filteredDrones = useMemo(() => {
    return drones.filter((drone) => {
      const capabilityMatch = filters.capability
        ? drone.capabilities.some((c) =>
            c.toLowerCase().includes(filters.capability.toLowerCase())
          )
        : true;
      const locationMatch = filters.location
        ? drone.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      return capabilityMatch && locationMatch;
    });
  }, [drones, filters]);
  
  const allCapabilities = useMemo(() => {
    const caps = new Set<string>();
    allDrones.forEach(d => d.capabilities.forEach(c => caps.add(c)));
    return Array.from(caps);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Filter by location..."
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Filter by capability..."
          value={filters.capability}
          onChange={(e) => handleFilterChange('capability', e.target.value)}
          className="max-w-xs"
        />
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Capabilities</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrones.map((drone) => (
              <TableRow key={drone.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-4">
                    <Image
                      src={drone.imageUrl}
                      alt={drone.model}
                      width={100}
                      height={75}
                      className="rounded-md object-cover"
                      data-ai-hint="drone"
                    />
                    <span>{drone.model}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {drone.capabilities.map((cap) => (
                      <Badge key={cap} variant="outline">{cap}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{drone.location}</TableCell>
                <TableCell>
                  <Select
                    value={drone.status}
                    onValueChange={(newStatus: DroneStatus) => handleStatusChange(drone.id, newStatus)}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue>
                        <Badge variant={getStatusBadgeVariant(drone.status)}>{drone.status}</Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {droneStatuses.map((status) => (
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
