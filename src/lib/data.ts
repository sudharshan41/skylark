import type { Pilot, Drone, Project, Assignment } from './types';

export const pilots: Pilot[] = [
  {
    id: 'P001',
    name: 'Arjun',
    avatarUrl: 'https://picsum.photos/seed/pilot1/200/200',
    skills: ['Mapping'],
    certifications: ['DGCA', 'Night Ops'],
    location: 'Bangalore',
    status: 'Available',
  },
  {
    id: 'P002',
    name: 'Neha',
    avatarUrl: 'https://picsum.photos/seed/pilot2/200/200',
    skills: ['Inspection'],
    certifications: ['DGCA'],
    location: 'Mumbai',
    status: 'On Mission',
  },
  {
    id: 'P003',
    name: 'Rohit',
    avatarUrl: 'https://picsum.photos/seed/pilot3/200/200',
    skills: ['Inspection'],
    certifications: ['DGCA'],
    location: 'Mumbai',
    status: 'Available',
  },
  {
    id: 'P004',
    name: 'Sneha',
    avatarUrl: 'https://picsum.photos/seed/pilot4/200/200',
    skills: ['Survey'],
    certifications: ['DGCA', 'Night Ops'],
    location: 'Bangalore',
    status: 'On Leave',
  },
];

export const drones: Drone[] = [
  {
    id: 'D001',
    model: 'DJI M300',
    imageUrl: 'https://picsum.photos/seed/drone1/400/300',
    capabilities: ['LiDAR', 'RGB'],
    location: 'Bangalore',
    status: 'Available',
  },
  {
    id: 'D002',
    model: 'DJI Mavic 3 RGB',
    imageUrl: 'https://picsum.photos/seed/drone2/400/300',
    capabilities: ['RGB'],
    location: 'Mumbai',
    status: 'In Maintenance',
  },
  {
    id: 'D003',
    model: 'DJI Mavic 3 Thermal',
    imageUrl: 'https://picsum.photos/seed/drone3/400/300',
    capabilities: ['Thermal'],
    location: 'Mumbai',
    status: 'On Mission',
  },
  {
    id: 'D004',
    model: 'Autel Evo II Thermal, RC',
    imageUrl: 'https://picsum.photos/seed/drone4/400/300',
    capabilities: ['Thermal', 'RC'],
    location: 'Bangalore',
    status: 'Available',
  },
];

export const projects: Project[] = [
  {
    id: 'PRJ001',
    name: 'Client A - Mapping',
    location: 'Bangalore',
    requiredSkills: ['Mapping'],
    requiredCertifications: ['DGCA'],
  },
  {
    id: 'PRJ002',
    name: 'Client B - Inspection',
    location: 'Mumbai',
    requiredSkills: ['Inspection'],
    requiredCertifications: ['DGCA', 'Night Vision'],
  },
];

export const assignments: Assignment[] = [
  {
    id: 'asgn-1',
    project: projects[1],
    pilot: pilots[1],
    drone: drones[2],
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    status: 'Active',
  },
  {
    id: 'asgn-2',
    project: projects[0],
    pilot: pilots[0],
    drone: drones[0],
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 32 * 60 * 60 * 1000).toISOString(),
    status: 'Upcoming',
  },
  {
    id: 'asgn-3',
    project: projects[1],
    pilot: pilots[2],
    drone: drones[1],
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    status: 'Completed',
  },
];
