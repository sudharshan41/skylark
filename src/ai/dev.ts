import { config } from 'dotenv';
config();

import '@/ai/flows/detect-assignment-conflicts.ts';
import '@/ai/flows/propose-urgent-reassignments.ts';