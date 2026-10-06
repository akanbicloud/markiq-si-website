import React from 'react';
import AppSidebar from '@/components/AppSidebar';

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell-container">
      <AppSidebar />
      <div
        style={{
          flex: '1 1 0%',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden',
        }}
      >
        <main
          style={{
            flex: '1 0 auto',
            width: '100%',
            maxWidth: '100vw',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
