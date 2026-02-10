import type { Pilot, Drone, Project, Assignment } from './types';

export const pilots: Pilot[] = [
  {
    id: 'pilot-1',
    name: 'Amelia Reyes',
    avatarUrl: 'https://picsum.photos/seed/pilot1/200/200',
    skills: ['UAV Piloting', 'Thermal Imaging', 'GIS Mapping'],
    certifications: ['Part 107', 'Level 1 Thermography'],
    location: 'Bangalore',
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
    location: 'Mumbai',
    status: 'On Mission',
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
    project: projects[1], // Client B - Inspection in Mumbai
    pilot: pilots[2], // Chloe Garcia in Mumbai
    drone: drones[2], // DJI Mavic 3 Thermal in Mumbai
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    status: 'Active',
  },
  {
    id: 'asgn-2',
    project: projects[0], // Client A - Mapping in Bangalore
    pilot: pilots[0], // Amelia Reyes in Bangalore
    drone: drones[0], // DJI M300 in Bangalore
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 32 * 60 * 60 * 1000).toISOString(),
    status: 'Upcoming',
  },
  {
    id: 'asgn-3',
    project: projects[2], // Client C - Thermal Imaging in Bangalore
    pilot: pilots[0], // Amelia Reyes in Bangalore
    drone: drones[3], // Autel Evo II in Bangalore
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    status: 'Completed',
  },
];
