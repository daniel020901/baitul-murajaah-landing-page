import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { mockAdminUser } from "@/data/mock"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon } from "lucide-react"

const data = {
  user: mockAdminUser,
  navMain: [
    {
      title: "Overview",
      url: "#overview",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Warta & Blog",
      url: "#blog",
      icon: <FileTextIcon />,
    },
    {
      title: "Bookstore",
      url: "#products",
      icon: <FolderIcon />,
    },
    {
      title: "Kegiatan",
      url: "#activities",
      icon: <ListIcon />,
    },
    {
      title: "Pesanan",
      url: "#orders",
      icon: <ChartBarIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Pengaturan",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Bantuan",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Cari",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
  documents: [
    {
      name: "Data Santri & Sanad",
      url: "#",
      icon: <DatabaseIcon />,
    },
    {
      name: "Laporan Bulanan",
      url: "#",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Katalog Kitab",
      url: "#",
      icon: <FileIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">Murojaah.id</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
