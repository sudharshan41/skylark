'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/pilots': 'Pilot Roster',
  '/drones': 'Drone Fleet',
  '/assignments': 'New Assignment',
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Skylark';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
    </header>
  );
}
