import React from 'react'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Outlet } from 'react-router-dom';

const Layout =()=>{
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}
export default Layout