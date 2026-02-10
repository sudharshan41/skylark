'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FilePlus, LayoutDashboard, Package, User, Users } from 'lucide-react';
import { SkylarkLogo } from '@/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/pilots', icon: Users, label: 'Pilots' },
  { href: '/drones', icon: Package, label: 'Drones' },
  { href: '/assignments', icon: FilePlus, label: 'New Assignment' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
        >
          <SkylarkLogo className="h-7 w-7 fill-primary" />
          <span
            className={cn(
              'font-semibold text-lg text-primary transition-opacity duration-200',
              'group-data-[collapsible=icon]:opacity-0'
            )}
          >
            Skylark
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
