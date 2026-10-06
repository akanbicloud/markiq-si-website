import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { Resend } from 'resend';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'resend',
      type: 'email',
      name: 'Resend',
      maxAge: 24 * 60 * 60, // 24 hours
      async sendVerificationRequest({ identifier: email, url }) {
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
          console.warn('[Auth Resend Warning]: RESEND_API_KEY is not set. Magic link URL:', url);
          return;
        }

        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: 'MarkIQ SI <auth@resend.dev>',
          to: email,
          subject: 'Sign in to MarkIQ SI (Magic Link)',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #060F22; color: #EAF1FF; padding: 40px 24px; border-radius: 12px; max-width: 560px; margin: 0 auto;">
              <div style="margin-bottom: 24px;">
                <span style="font-size: 24px; font-weight: 700; color: #EAF1FF;">MarkIQ</span>
                <span style="font-size: 11px; font-weight: 600; color: #04101F; background-color: #4A9DFF; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">SI</span>
              </div>
              <h2 style="font-size: 22px; color: #EAF1FF;">Your MarkIQ SI sign in link</h2>
              <p style="color: #A3B5D6; font-size: 15px; line-height: 1.6;">
                Click the button below to sign in directly to your MarkIQ SI dashboard. This link expires in 24 hours and can only be used once.
              </p>
              <div style="margin: 32px 0;">
                <a href="${url}" style="background-color: #FFB547; color: #1A1203; padding: 14px 28px; border-radius: 10px; font-weight: 600; text-decoration: none; display: inline-block; font-size: 16px;">
                  Sign in to MarkIQ SI →
                </a>
              </div>
              <p style="color: #7F93B8; font-size: 13px; line-height: 1.5;">
                If you did not request this email, you can safely ignore it. No password is stored on MarkIQ SI servers.
              </p>
            </div>
          `,
        });
      },
    },
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      if (db) {
        try {
          const cleanEmail = user.email.toLowerCase().trim();
          const existing = await db
            .select()
            .from(users)
            .where(eq(users.email, cleanEmail))
            .limit(1);

          if (existing.length === 0) {
            await db.insert(users).values({
              id: user.id || 'usr_' + Date.now(),
              email: cleanEmail,
              name: user.name || cleanEmail.split('@')[0],
              image: user.image,
              emailVerified: new Date(),
            });
          }
        } catch (err: any) {
          console.error('[Auth SignIn DB Error]:', err.message);
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/onboarding?mode=login',
    error: '/onboarding?mode=login&error=true',
    verifyRequest: '/onboarding?mode=login&checkEmail=true',
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'markiq-si-jwt-secret-placeholder-key-2026',
};
