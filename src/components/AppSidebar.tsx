'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import {
  SquaresFour,
  Newspaper,
  ChartBar,
  Broadcast,
  Compass,
  FileText,
  GraduationCap,
  ChatCircleDots,
  UsersThree,
  Code,
  ChartLineUp,
  BookOpen,
  ShieldCheck,
  Bell,
  List,
  X,
} from '@phosphor-icons/react';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number | string; weight?: 'light' | 'regular' | 'bold' | 'fill' | 'thin' | 'duotone'; color?: string }>;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const APP_NAV_GROUPS: NavGroup[] = [
  {
    label: '',
    items: [{ label: 'Dashboard', href: '/dashboard', icon: SquaresFour }],
  },
  {
    label: 'MARKETS',
    items: [
      { label: 'News feed', href: '/news', icon: Newspaper },
      { label: 'Market dashboard', href: '/markets', icon: ChartBar },
      { label: 'Live Desk', href: '/live-desk', icon: Broadcast },
      { label: 'Reaction Explorer', href: '/explorer', icon: Compass },
      { label: 'Research', href: '/research', icon: FileText },
    ],
  },
  {
    label: 'LEARN',
    items: [
      { label: 'Academy', href: '/academy', icon: GraduationCap },
      { label: 'AI Tutor', href: '/lesson', icon: ChatCircleDots },
      { label: 'Community', href: '/community', icon: UsersThree },
    ],
  },
  {
    label: 'TRADE TOOLS',
    items: [
      { label: 'Strategy Lab', href: '/strategy-lab', icon: Code },
      { label: 'Chart Lab', href: '/chart-lab', icon: ChartLineUp },
      { label: 'Journal', href: '/journal', icon: BookOpen },
      { label: 'Risk & prop tools', href: '/tools', icon: ShieldCheck },
    ],
  },
  {
    label: 'SETTINGS',
    items: [{ label: 'Alerts', href: '/alerts', icon: Bell }],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderSidebarContent = (isMobileView: boolean = false) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '20px 14px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {/* Top Header with Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px 18px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <Logo href="/" size="sm" />
        {isMobileView && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              background: 'transparent',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text)',
              cursor: 'pointer',
            }}
          >
            <X size={22} weight="light" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <nav
        aria-label="Application navigation"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '18px',
          flex: 1,
        }}
      >
        {APP_NAV_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {group.label && (
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: 'var(--dim)',
                  padding: '6px 12px 2px',
                  textTransform: 'uppercase',
                }}
              >
                {group.label}
              </span>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobileView && setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    minHeight: '44px',
                    padding: '0 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    textDecoration: 'none',
                    backgroundColor: isActive ? 'var(--surface-2)' : 'transparent',
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                    fontWeight: isActive ? 600 : 400,
                    border: isActive ? '1px solid var(--line-strong)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon
                    size={20}
                    weight="light"
                    color={isActive ? 'var(--blue)' : 'var(--muted)'}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Account / Footer */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingLeft: '6px',
          paddingRight: '6px',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-2)',
            border: '1px solid var(--line-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: 700,
            fontSize: '14px',
            color: 'var(--blue-soft)',
            flexShrink: 0,
          }}
        >
          Y
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Your account
          </span>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--dim)',
              fontFamily: 'var(--font-ibm-plex-mono)',
            }}
          >
            Free plan · preview
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top App Bar (Phones / small screens) */}
      <header
        className="app-mobile-topbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          width: '100%',
          minHeight: '60px',
          backgroundColor: 'var(--bg-sidebar)',
          borderBottom: '1px solid var(--line)',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar navigation"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              minWidth: '44px',
              minHeight: '44px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--line-strong)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <List size={24} weight="light" />
          </button>
          <Logo href="/" size="sm" />
        </div>

        <Link
          href="/"
          style={{
            fontSize: '13px',
            color: 'var(--blue-soft)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--line)',
          }}
        >
          Public Site
        </Link>
      </header>

      {/* Mobile Off-canvas Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(2, 6, 15, 0.75)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
        />
      )}

      {/* Mobile Off-canvas Drawer Panel */}
      <div
        className={`app-mobile-drawer ${mobileOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: '280px',
          maxWidth: '85vw',
          backgroundColor: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--line)',
          zIndex: 100,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: mobileOpen ? '0 0 40px rgba(0, 0, 0, 0.7)' : 'none',
        }}
      >
        {renderSidebarContent(true)}
      </div>

      {/* Desktop Persistent Left Sidebar */}
      <aside
        className="app-desktop-sidebar"
        style={{
          width: '260px',
          minWidth: '260px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--line)',
          flexShrink: 0,
        }}
      >
        {renderSidebarContent(false)}
      </aside>
    </>
  );
}
