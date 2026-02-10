'use server';

/**
 * @fileOverview This file defines the Genkit flow for proposing optimal pilot/drone reassignments in urgent situations.
 *
 * - proposeUrgentReassignments - A function that takes an urgent situation description and proposes optimal reassignments.
 * - ProposeUrgentReassignmentsInput - The input type for the proposeUrgentReassignments function.
 * - ProposeUrgentReassignmentsOutput - The return type for the proposeUrgentReassignments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProposeUrgentReassignmentsInputSchema = z.object({
  situationDescription: z
    .string()
    .describe('A description of the urgent situation.'),
});
export type ProposeUrgentReassignmentsInput = z.infer<
  typeof ProposeUrgentReassignmentsInputSchema
>;

const ProposeUrgentReassignmentsOutputSchema = z.object({
  reassignmentProposal: z
    .string()
    .describe(
      'A detailed proposal for reassigning pilots and drones to address the urgent situation, including rationale.'
    ),
});
export type ProposeUrgentReassignmentsOutput = z.infer<
  typeof ProposeUrgentReassignmentsOutputSchema
>;

export async function proposeUrgentReassignments(
  input: ProposeUrgentReassignmentsInput
): Promise<ProposeUrgentReassignmentsOutput> {
  return proposeUrgentReassignmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proposeUrgentReassignmentsPrompt',
  input: {schema: ProposeUrgentReassignmentsInputSchema},
  output: {schema: ProposeUrgentReassignmentsOutputSchema},
  prompt: `You are an expert coordinator specializing in reassigning pilots and drones in urgent situations.

  Given the following urgent situation, propose an optimal reassignment plan, considering real-time availability, skills, and location of pilots and drones.

  Urgent Situation: {{{situationDescription}}}

  Provide a detailed proposal with clear reasoning for each reassignment, aiming for minimal disruption to ongoing projects.`,
});

const proposeUrgentReassignmentsFlow = ai.defineFlow(
  {
    name: 'proposeUrgentReassignmentsFlow',
    inputSchema: ProposeUrgentReassignmentsInputSchema,
    outputSchema: ProposeUrgentReassignmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
