import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ href = '/', size = 'md' }: LogoProps) {
  const iconHeight = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const iconWidth = Math.round(iconHeight * 1.11);
  const textFontSize = size === 'sm' ? '18px' : size === 'lg' ? '24px' : '20px';
  const badgeFontSize = size === 'sm' ? '10px' : size === 'lg' ? '13px' : '11px';

  return (
    <Link
      href={href}
      aria-label="MarkIQ SI home"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        color: 'var(--text)',
        minHeight: '44px',
        userSelect: 'none',
      }}
    >
      {/* Brand logo mark from brand/markiq-logo.svg */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Image
          src="/brand/markiq-logo.svg"
          alt="MarkIQ Logo"
          width={iconWidth}
          height={iconHeight}
          priority
          style={{ width: `${iconWidth}px`, height: `${iconHeight}px`, objectFit: 'contain' }}
        />
      </div>

      {/* Wordmark: MarkIQ + SI badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: 700,
            fontSize: textFontSize,
            letterSpacing: '0.06em',
            color: 'var(--text)',
            lineHeight: 1,
          }}
        >
          MarkIQ
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontSize: badgeFontSize,
            fontWeight: 600,
            color: '#04101F',
            background: 'var(--blue)',
            padding: '2px 6px',
            borderRadius: 'var(--radius-xs)',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          SI
        </span>
      </div>
    </Link>
  );
}
