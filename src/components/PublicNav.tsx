'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { List, X } from '@phosphor-icons/react';

const NAV_LINKS = [
  { label: 'Academy', href: '/academy' },
  { label: 'Live Desk', href: '/live-desk' },
  { label: 'AI Tutor', href: '/lesson' },
  { label: 'Strategy Lab', href: '/strategy-lab' },
  { label: 'Chart Lab', href: '/chart-lab' },
  { label: 'Journal', href: '/journal' },
  { label: 'Pricing', href: '/pricing' },
];

export default function PublicNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--line)',
        backgroundColor: 'rgba(6, 15, 34, 0.94)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? (
              <X size={24} weight="light" />
            ) : (
              <List size={24} weight="light" />
            )}
          </button>
          <Logo href="/" size="sm" />
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Public" className="desktop-nav">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: isActive ? 'var(--text)' : 'var(--muted)',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'color 0.2s ease',
                  padding: '8px 6px',
                  fontSize: '14.5px',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action Buttons */}
        <div className="desktop-actions">
          <Link
            href="/onboarding?mode=login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              padding: '0 16px',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--line-strong)',
              color: 'var(--text)',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Log in
          </Link>
          <Link
            href="/onboarding"
            className="mq-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              padding: '0 18px',
              borderRadius: 'var(--radius-btn)',
              background: 'var(--amber)',
              color: '#1A1203',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Get early access
          </Link>
        </div>

        {/* Mobile Right Action */}
        <div className="mobile-login-btn">
          <Link
            href="/onboarding?mode=login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '40px',
              padding: '0 14px',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--line-strong)',
              color: 'var(--text)',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--line)',
            background: 'var(--bg-sidebar)',
            padding: '16px 16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <nav aria-label="Mobile Navigation" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '44px',
                    padding: '0 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'var(--surface-2)' : 'transparent',
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                    fontSize: '15px',
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '8px' }}>
            <Link
              href="/onboarding?mode=login"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '44px',
                borderRadius: 'var(--radius-btn)',
                border: '1px solid var(--line-strong)',
                color: 'var(--text)',
                fontWeight: 600,
                fontSize: '15px',
              }}
            >
              Log in
            </Link>
            <Link
              href="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '44px',
                borderRadius: 'var(--radius-btn)',
                background: 'var(--amber)',
                color: '#1A1203',
                fontWeight: 600,
                fontSize: '15px',
              }}
            >
              Get early access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
