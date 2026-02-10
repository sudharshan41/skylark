'use client';

import { useState } from 'react';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { proposeUrgentReassignments } from '@/ai/flows/propose-urgent-reassignments';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { assignments, drones, pilots } from '@/lib/data';

const AI_ASSISTANT_COOLDOWN = 30000; // 30 seconds
const COOLDOWN_STORAGE_KEY = 'lastAIAssistantTimestamp';

export function UrgentReassignmentTool() {
  const [open, setOpen] = useState(false);
  const [situation, setSituation] = useState('');
  const [proposal, setProposal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!situation) return;

    const lastCheckTimestamp = localStorage.getItem(COOLDOWN_STORAGE_KEY);
    const now = Date.now();

    if (lastCheckTimestamp && now - parseInt(lastCheckTimestamp, 10) < AI_ASSISTANT_COOLDOWN) {
      const timeLeft = Math.ceil((AI_ASSISTANT_COOLDOWN - (now - parseInt(lastCheckTimestamp, 10))) / 1000);
      toast({
        title: 'AI Assistant is cooling down',
        description: `Please wait ${timeLeft} more seconds before making another request.`,
      });
      return;
    }

    localStorage.setItem(COOLDOWN_STORAGE_KEY, now.toString());
    setIsLoading(true);
    setProposal('');
    try {
      const result = await proposeUrgentReassignments({
        situationDescription: situation,
        pilotsJson: JSON.stringify(pilots),
        dronesJson: JSON.stringify(drones),
        assignmentsJson: JSON.stringify(assignments),
      });
      setProposal(result.reassignmentProposal);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate reassignment proposal. You may have hit a rate limit.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          Urgent Reassignment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Urgent Reassignment Tool
          </DialogTitle>
          <DialogDescription>
            Describe an urgent situation (e.g., pilot illness, drone malfunction) to get an AI-powered reassignment plan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="e.g., 'Pilot Neha reported sick for Client B - Inspection. Drone DJI Mavic 3 Thermal is on site in Mumbai. Need a replacement pilot with Inspection skills immediately.'"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            rows={4}
          />
        </div>
        {isLoading && (
          <div className="flex items-center justify-center rounded-lg border p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {proposal && (
          <Alert>
            <Bot className="h-4 w-4" />
            <AlertTitle className="font-headline">Reassignment Proposal</AlertTitle>
            <AlertDescription className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
              {proposal}
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || !situation}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Proposal'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
