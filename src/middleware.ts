import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { getToken } from 'next-auth/jwt';

// Protected routes belonging to the signed-in app shell
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/markets',
  '/news',
  '/alerts',
  '/lesson',
  '/explorer',
  '/research',
  '/community',
  '/tools',
  '/chart-lab',
  '/strategy-lab',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected) {
    // Check if session token exists
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'markiq-si-jwt-secret-placeholder-key-2026',
    });

    if (!token) {
      const url = new URL('/onboarding', req.url);
      url.searchParams.set('mode', 'login');
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg, brand/
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|brand/).*)',
  ],
};
