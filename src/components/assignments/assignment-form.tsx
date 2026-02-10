'use client';

import { useState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertTriangle, Bot, Loader2 } from 'lucide-react';

import { pilots, drones, projects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { detectAssignmentConflicts } from '@/ai/flows/detect-assignment-conflicts';
import { useToast } from '@/hooks/use-toast';

const assignmentSchema = z.object({
  projectId: z.string().min(1, 'Project is required.'),
  pilotId: z.string().min(1, 'Pilot is required.'),
  droneId: z.string().min(1, 'Drone is required.'),
});

type AssignmentFormValues = z.infer<typeof assignmentSchema>;

export function AssignmentForm() {
  const [conflicts, setConflicts] = useState<string[]>([]);
  const [conflictCheckRan, setConflictCheckRan] = useState(false);
  const [isCheckingConflicts, startConflictCheck] = useTransition();
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const { toast } = useToast();

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      projectId: '',
      pilotId: '',
      droneId: '',
    },
  });

  const { watch, handleSubmit, getValues, reset } = form;
  const projectId = watch('projectId');
  const pilotId = watch('pilotId');
  const droneId = watch('droneId');

  useEffect(() => {
    setConflictCheckRan(false);
    setConflicts([]);
  }, [projectId, pilotId, droneId]);

  async function handleConflictCheck() {
    const values = getValues();
    if (!values.projectId || !values.pilotId || !values.droneId) {
      return;
    }
    
    setIsCoolingDown(true);
    setConflictCheckRan(false);

    startConflictCheck(async () => {
      const project = projects.find((p) => p.id === values.projectId);
      const pilot = pilots.find((p) => p.id === values.pilotId);
      const drone = drones.find((d) => d.id === values.droneId);

      if (!project || !pilot || !drone) {
        return;
      }

      try {
        const result = await detectAssignmentConflicts({
          pilotId: values.pilotId,
          droneId: values.droneId,
          projectId: values.projectId,
          assignmentStartTime: new Date().toISOString(),
          assignmentEndTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          pilotSkills: pilot.skills,
          requiredSkills: project.requiredSkills,
          pilotLocation: pilot.location,
          droneLocation: drone.location,
          projectLocation: project.location,
          pilotCertifications: pilot.certifications,
          requiredCertifications: project.requiredCertifications,
        });
        setConflicts(result.conflicts);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to check for conflicts. You may have hit a rate limit.',
        });
        setConflicts(['An unexpected error occurred while checking for conflicts.']);
      } finally {
        setConflictCheckRan(true);
      }
    });

    setTimeout(() => setIsCoolingDown(false), 15000); // 15-second cooldown
  }

  function onSubmit(data: AssignmentFormValues) {
    if (!conflictCheckRan || conflicts.length > 0) {
      toast({
        variant: "destructive",
        title: "Cannot create assignment",
        description: "Please run a conflict check and resolve any issues before creating the assignment.",
      });
      return;
    }

    console.log(data);
    toast({
        title: "Assignment Created!",
        description: "The new assignment has been successfully scheduled."
    })
    reset();
    setConflicts([]);
    setConflictCheckRan(false);
  }
  
  const allFieldsSelected = projectId && pilotId && droneId;

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Match Assignment</CardTitle>
        <CardDescription>Select a project, pilot, and drone to create a new assignment. The AI will automatically check for conflicts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pilotId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilot</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a pilot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pilots.map((pilot) => (
                          <SelectItem key={pilot.id} value={pilot.id}>
                            {pilot.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="droneId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a drone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {drones.map((drone) => (
                          <SelectItem key={drone.id} value={drone.id}>
                            {drone.model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button type="button" onClick={handleConflictCheck} disabled={!allFieldsSelected || isCheckingConflicts || isCoolingDown}>
                    {isCheckingConflicts ? (
                      <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Checking...
                      </>
                    ) : isCoolingDown ? (
                      'Cooldown...'
                    ) : (
                      'Check for Conflicts'
                    )}
                </Button>
                {isCheckingConflicts && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span>AI is checking for conflicts...</span>
                    </div>
                )}
            </div>

            {conflictCheckRan && conflicts.length > 0 && !isCheckingConflicts && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="font-headline">Assignment Conflicts Detected</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {conflicts.map((conflict, index) => (
                      <li key={index}>{conflict}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {conflictCheckRan && conflicts.length === 0 && !isCheckingConflicts && allFieldsSelected && (
                 <Alert variant="default" className="bg-primary/10 border-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                    <AlertTitle className="font-headline text-primary">No Conflicts Detected</AlertTitle>
                    <AlertDescription className="text-primary/80">
                        This assignment is ready to be scheduled.
                    </AlertDescription>
                </Alert>
            )}

            <Button type="submit" disabled={!allFieldsSelected || !conflictCheckRan || conflicts.length > 0 || isCheckingConflicts}>
              Create Assignment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
