export type PilotStatus = 'Available' | 'On Leave' | 'Unavailable' | 'On Mission';
export type DroneStatus = 'Available' | 'In Maintenance' | 'On Mission';

export interface Pilot {
  id: string;
  name: string;
  avatarUrl: string;
  skills: string[];
  certifications: string[];
  location: string;
  status: PilotStatus;
}

export interface Drone {
  id: string;
  model: string;
  imageUrl: string;
  capabilities: string[];
  location: string;
  status: DroneStatus;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  requiredSkills: string[];
  requiredCertifications: string[];
}

export interface Assignment {
  id: string;
  project: Project;
  pilot: Pilot;
  drone: Drone;
  startTime: string;
  endTime: string;
  status: 'Active' | 'Completed' | 'Upcoming';
}
