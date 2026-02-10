import { DroneTable } from '@/components/drones/drone-table';

export default function DronesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">Drone Fleet</h2>
        <p className="text-muted-foreground">
          Query the drone fleet by capability, availability, and location.
        </p>
      </div>
      <DroneTable />
    </div>
  );
}
