import type { Pilot, Drone, Project, Assignment } from './types';

export const pilots: Pilot[] = [
  {
    id: 'pilot-1',
    name: 'Amelia Reyes',
    avatarUrl: 'https://picsum.photos/seed/pilot1/200/200',
    skills: ['UAV Piloting', 'Thermal Imaging', 'GIS Mapping'],
    certifications: ['Part 107', 'Level 1 Thermography'],
    location: 'San Francisco, CA',
    status: 'Available',
  },
  {
    id: 'pilot-2',
    name: 'Ben Carter',
    avatarUrl: 'https://picsum.photos/seed/pilot2/200/200',
    skills: ['FPV Drone Racing', 'Cinematography', '3D Modeling'],
    certifications: ['Part 107', 'TRUST'],
    location: 'Austin, TX',
    status: 'On Mission',
  },
  {
    id: 'pilot-3',
    name: 'Chloe Garcia',
    avatarUrl: 'https://picsum.photos/seed/pilot3/200/200',
    skills: ['Agricultural Surveys', 'Payload Operation', 'LIDAR Scanning'],
    certifications: ['Part 107', 'Pesticide Applicator'],
    location: 'Des Moines, IA',
    status: 'Available',
  },
  {
    id: 'pilot-4',
    name: 'David Chen',
    avatarUrl: 'https://picsum.photos/seed/pilot4/200/200',
    skills: ['Search and Rescue', 'Night Operations', 'Swarm Control'],
    certifications: ['Part 107', 'Wilderness First Responder'],
    location: 'Denver, CO',
    status: 'On Leave',
  },
  {
    id: 'pilot-5',
    name: 'Eva Rostova',
    avatarUrl: 'https://picsum.photos/seed/pilot5/200/200',
    skills: ['Infrastructure Inspection', 'Data Analysis', 'UAV Piloting'],
    certifications: ['Part 107', 'ASNT-TC-1A'],
    location: 'New York, NY',
    status: 'Unavailable',
  },
];

export const drones: Drone[] = [
  {
    id: 'drone-1',
    model: 'AeroScout Pro',
    imageUrl: 'https://picsum.photos/seed/drone1/400/300',
    capabilities: ['4K Camera', '30-min Flight Time', 'Obstacle Avoidance', 'Thermal Imaging'],
    location: 'San Francisco, CA',
    status: 'Available',
  },
  {
    id: 'drone-2',
    model: 'TerraWing X',
    imageUrl: 'https://picsum.photos/seed/drone2/400/300',
    capabilities: ['LIDAR Scanner', '1-hour Flight Time', 'Heavy Payload (15kg)'],
    location: 'Des Moines, IA',
    status: 'Available',
  },
  {
    id: 'drone-3',
    model: 'CineMover 8K',
    imageUrl: 'https://picsum.photos/seed/drone3/400/300',
    capabilities: ['8K Cinema Camera', 'Dual Operator Control', 'FPV Mode'],
    location: 'Austin, TX',
    status: 'On Mission',
  },
  {
    id: 'drone-4',
    model: 'NightHawk IR',
    imageUrl: 'https://picsum.photos/seed/drone4/400/300',
    capabilities: ['Infrared Camera', 'Silent Rotors', '45-min Flight Time', 'Search and Rescue'],
    location: 'Denver, CO',
    status: 'In Maintenance',
  },
  {
    id: 'drone-5',
    model: 'SkyCarrier H20',
    imageUrl: 'https://picsum.photos/seed/drone5/400/300',
    capabilities: ['Heavy Payload (20kg)', 'Package Delivery System', '1-hour Flight Time'],
    location: 'San Francisco, CA',
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
  {
    id: 'PRJ003',
    name: 'Client C - Thermal Imaging',
    location: 'Bangalore',
    requiredSkills: ['Thermal Imaging'],
    requiredCertifications: ['DGCA'],
  },
];

export const assignments: Assignment[] = [
  {
    id: 'asgn-1',
    project: projects[1], // Client B - Inspection
    pilot: pilots[1], // Ben Carter
    drone: drones[2], // CineMover 8K
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    status: 'Active',
  },
  {
    id: 'asgn-2',
    project: projects[0], // Client A - Mapping
    pilot: pilots[0], // Amelia Reyes
    drone: drones[0], // AeroScout Pro
    startTime: new Date('2026-02-06T09:00:00Z').toISOString(),
    endTime: new Date('2026-02-08T17:00:00Z').toISOString(),
    status: 'Upcoming',
  },
  {
    id: 'asgn-3',
    project: projects[2], // Client C - Thermal Imaging
    pilot: pilots[3], // David Chen
    drone: drones[3], // NightHawk IR
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    status: 'Completed',
  },
];
