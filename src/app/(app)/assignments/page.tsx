import { AssignmentForm } from '@/components/assignments/assignment-form';

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">New Assignment</h2>
        <p className="text-muted-foreground">
          Create a new assignment and let the AI assistant check for potential conflicts.
        </p>
      </div>
      <AssignmentForm />
    </div>
  );
}
