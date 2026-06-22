'use client';

import React, { createContext, useContext, useState } from 'react';

interface DashboardContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeRoute, setActiveRoute] = useState('dashboard');

  return (
    <DashboardContext.Provider value={{ sidebarOpen, setSidebarOpen, activeRoute, setActiveRoute }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}
