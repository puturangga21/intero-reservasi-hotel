'use client';

import { Book, Home, Image, User } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import LogoutAdmin from './custom/logout-admin';
import { NavProjects } from './nav-projects';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  projects: [
    {
      name: 'Customer',
      url: '/customer',
      icon: User,
    },
    {
      name: 'Employee',
      url: '/employee',
      icon: User,
    },
    {
      name: 'Room',
      url: '/room',
      icon: Home,
    },
    {
      name: 'Room Gallery',
      url: '/room-gallery',
      icon: Image,
    },
    {
      name: 'Customer Reserve',
      url: '/customer-reserve',
      icon: Book,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Home className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Interoperabilitas</span>
                  <span className="truncate text-xs">Kelompok 1</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <LogoutAdmin />
      </SidebarFooter>
    </Sidebar>
  );
}
