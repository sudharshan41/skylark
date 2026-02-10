import { PilotTable } from '@/components/pilots/pilot-table';

export default function PilotsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">Pilot Roster</h2>
        <p className="text-muted-foreground">
          Query pilot availability by skill, certification, and location.
        </p>
      </div>
      <PilotTable />
    </div>
  );
}
