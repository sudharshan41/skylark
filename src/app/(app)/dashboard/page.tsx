import { assignments } from '@/lib/data';
import type { Assignment } from '@/lib/types';
import { AssignmentCard } from '@/components/dashboard/assignment-card';
import { UrgentReassignmentTool } from '@/components/dashboard/urgent-reassignment-tool';

export default function DashboardPage() {
  const activeAssignments = assignments.filter((a) => a.status === 'Active');
  const upcomingAssignments = assignments.filter((a) => a.status === 'Upcoming');

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Welcome Back
          </h2>
          <p className="text-muted-foreground">
            Here's a real-time overview of your operations.
          </p>
        </div>
        <UrgentReassignmentTool />
      </div>

      <section>
        <h3 className="text-2xl font-semibold tracking-tight mb-4 font-headline">Active Assignments</h3>
        {activeAssignments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeAssignments.map((assignment: Assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">No active assignments at the moment.</p>
          </div>
        )}
      </section>

      <section>
        <h3 className="text-2xl font-semibold tracking-tight mb-4 font-headline">Upcoming Assignments</h3>
        {upcomingAssignments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingAssignments.map((assignment: Assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">No upcoming assignments scheduled.</p>
          </div>
        )}
      </section>
    </div>
  );
}
