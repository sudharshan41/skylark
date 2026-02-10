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

export function UrgentReassignmentTool() {
  const [open, setOpen] = useState(false);
  const [situation, setSituation] = useState('');
  const [proposal, setProposal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!situation) return;
    setIsLoading(true);
    setProposal('');
    try {
      const result = await proposeUrgentReassignments({ situationDescription: situation });
      setProposal(result.reassignmentProposal);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate reassignment proposal.',
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
            placeholder="e.g., 'Pilot Ben Carter reported sick for SXSW shoot. Drone CineMover 8K is on site in Austin. Need a replacement pilot with cinematography skills immediately.'"
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
            <AlertDescription className="prose prose-sm max-w-none text-foreground">
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
