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
    id: 'proj-1',
    name: 'Golden Gate Bridge Inspection',
    location: 'San Francisco, CA',
    requiredSkills: ['Infrastructure Inspection', 'UAV Piloting'],
    requiredCertifications: ['Part 107', 'ASNT-TC-1A'],
  },
  {
    id: 'proj-2',
    name: 'SXSW Music Festival Aerial Shots',
    location: 'Austin, TX',
    requiredSkills: ['Cinematography', 'FPV Drone Racing'],
    requiredCertifications: ['Part 107'],
  },
  {
    id: 'proj-3',
    name: 'Iowa Cornfield Health Survey',
    location: 'Des Moines, IA',
    requiredSkills: ['Agricultural Surveys', 'GIS Mapping'],
    requiredCertifications: ['Part 107', 'Pesticide Applicator'],
  },
  {
    id: 'proj-4',
    name: 'Rocky Mountain SAR Operation',
    location: 'Denver, CO',
    requiredSkills: ['Search and Rescue', 'Night Operations', 'Thermal Imaging'],
    requiredCertifications: ['Part 107', 'Wilderness First Responder'],
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
    pilot: pilots[4],
    drone: drones[0],
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 30 * 60 * 60 * 1000).toISOString(),
    status: 'Upcoming',
  },
  {
    id: 'asgn-3',
    project: projects[3],
    pilot: pilots[3],
    drone: drones[3],
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    status: 'Completed',
  },
];
