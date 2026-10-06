import { NextResponse } from 'next/server';
import { db } from '@/db';
import { waitlist } from '@/db/schema';
import { Resend } from 'resend';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Save to Neon Postgres via Drizzle if DB is connected
    let isNewUser = true;
    if (db) {
      try {
        const existing = await db
          .select()
          .from(waitlist)
          .where(eq(waitlist.email, cleanEmail))
          .limit(1);

        if (existing.length > 0) {
          isNewUser = false;
        } else {
          await db.insert(waitlist).values({
            email: cleanEmail,
            source: 'website',
            status: 'confirmed',
          });
        }
      } catch (dbErr: any) {
        console.error('[Waitlist DB Error]:', dbErr.message);
        // Continue to attempt email even if DB error occurs
      }
    }

    // 2. Send Real Confirmation Email via Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: 'MarkIQ SI <onboarding@resend.dev>',
          to: cleanEmail,
          subject: "You're on the MarkIQ SI Early Access list",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060F22; color: #EAF1FF; padding: 40px 24px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
              <div style="margin-bottom: 24px;">
                <span style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: 0.06em; color: #EAF1FF;">MarkIQ</span>
                <span style="font-size: 11px; font-weight: 600; color: #04101F; background-color: #4A9DFF; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">SI</span>
              </div>
              <h1 style="font-size: 22px; color: #EAF1FF; margin-top: 0;">Welcome to MarkIQ SI Early Access</h1>
              <p style="color: #A3B5D6; font-size: 15px; line-height: 1.6;">
                You have been registered for priority early access. You will receive an invitation as soon as the next cohort opens for our real-time Telegram intelligence feed, Academy courses, and Strategy Lab.
              </p>
              <div style="background-color: #0B1A36; border: 1px solid #1C3563; border-radius: 8px; padding: 16px; margin: 24px 0;">
                <div style="font-size: 13px; color: #FFB547; font-weight: 600; margin-bottom: 6px;">WHAT WE TRACK:</div>
                <div style="font-size: 14px; color: #C9D6EE; line-height: 1.5;">
                  • High-impact central bank rate decisions (Fed, ECB, BoE, BoJ)<br/>
                  • Inflation (CPI/PCE), Employment (NFP), GDP<br/>
                  • Dual WAT (UTC+1) and GMT (UTC+0) release timing<br/>
                  • Clear historical distributions &amp; surprise scores
                </div>
              </div>
              <p style="color: #7F93B8; font-size: 13px; line-height: 1.5; margin-bottom: 0;">
                Rule 2 Compliance Notice: MarkIQ SI describes historical macro mechanics and data; we never offer trade signals, investment advice, or managed accounts.
              </p>
            </div>
          `,
        });
        emailSent = true;
      } catch (emailErr: any) {
        console.error('[Waitlist Resend Error]:', emailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: isNewUser
        ? 'Thank you! You are on the early access list.'
        : 'Welcome back! Your email is already on the priority access list.',
      emailSent,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'An error occurred while saving your email.' },
      { status: 500 }
    );
  }
}
