'use server';

/**
 * @fileOverview Detects conflicts in pilot and drone assignments.
 *
 * - detectAssignmentConflicts - Detects double-bookings, skill/certification mismatches, and equipment-pilot location mismatches.
 * - DetectAssignmentConflictsInput - The input type for the detectAssignmentConflicts function.
 * - DetectAssignmentConflictsOutput - The return type for the detectAssignmentConflicts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAssignmentConflictsInputSchema = z.object({
  pilotId: z.string().describe('The ID of the pilot.'),
  droneId: z.string().describe('The ID of the drone.'),
  projectId: z.string().describe('The ID of the project.'),
  assignmentStartTime: z.string().describe('The start time of the assignment (ISO format).'),
  assignmentEndTime: z.string().describe('The end time of the assignment (ISO format).'),
  pilotSkills: z.array(z.string()).describe('List of skills possessed by the pilot.'),
  requiredSkills: z.array(z.string()).describe('List of skills required for the project.'),
  pilotLocation: z.string().describe('The current location of the pilot.'),
  droneLocation: z.string().describe('The current location of the drone.'),
  projectLocation: z.string().describe('The location of the project.'),
  pilotCertifications: z.array(z.string()).describe('List of certifications held by the pilot.'),
  requiredCertifications: z.array(z.string()).describe('List of certifications required for the project.'),
});
export type DetectAssignmentConflictsInput = z.infer<
  typeof DetectAssignmentConflictsInputSchema
>;

const DetectAssignmentConflictsOutputSchema = z.object({
  conflicts: z.array(
    z.string().describe('A description of the conflict detected.')
  ).describe('List of conflicts detected in the assignment.'),
});
export type DetectAssignmentConflictsOutput = z.infer<
  typeof DetectAssignmentConflictsOutputSchema
>;

export async function detectAssignmentConflicts(
  input: DetectAssignmentConflictsInput
): Promise<DetectAssignmentConflictsOutput> {
  return detectAssignmentConflictsFlow(input);
}

const detectAssignmentConflictsPrompt = ai.definePrompt({
  name: 'detectAssignmentConflictsPrompt',
  input: {schema: DetectAssignmentConflictsInputSchema},
  output: {schema: DetectAssignmentConflictsOutputSchema},
  prompt: `You are an AI assistant that detects conflicts in pilot and drone assignments for Skylark AI Coordinator.

  Analyze the following assignment details and identify any potential conflicts, such as double-bookings, skill/certification mismatches, and equipment-pilot location mismatches.

  Pilot ID: {{{pilotId}}}
  Drone ID: {{{droneId}}}
  Project ID: {{{projectId}}}
  Assignment Start Time: {{{assignmentStartTime}}}
  Assignment End Time: {{{assignmentEndTime}}}
  Pilot Skills: {{#each pilotSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Required Skills: {{#each requiredSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Pilot Location: {{{pilotLocation}}}
  Drone Location: {{{droneLocation}}}
  Project Location: {{{projectLocation}}}
  Pilot Certifications: {{#each pilotCertifications}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Required Certifications: {{#each requiredCertifications}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Provide a list of conflicts detected. If there are no conflicts, the list should be empty.
  Ensure that start and end times are converted to Date objects before comparison.

  Output the results as a JSON array of strings, where each string describes a conflict.
  `,
});

const detectAssignmentConflictsFlow = ai.defineFlow(
  {
    name: 'detectAssignmentConflictsFlow',
    inputSchema: DetectAssignmentConflictsInputSchema,
    outputSchema: DetectAssignmentConflictsOutputSchema,
  },
  async input => {
    const {output} = await detectAssignmentConflictsPrompt(input);
    return output!;
  }
);
