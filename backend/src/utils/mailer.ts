import 'dotenv/config';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is required in backend environment variables.');
}

const FROM_EMAIL = process.env.SMTP_FROM_EMAIL;
if (!FROM_EMAIL) {
    throw new Error('SMTP_FROM_EMAIL is required in backend environment variables and must be a verified sender on Resend.');
}

const resend = new Resend(RESEND_API_KEY);
const APP_NAME = process.env.APP_NAME || 'Avatar India';

/**
 * Send Password Reset Email via Resend
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;
    console.log(`[Resend] Sending password reset email to: ${email}`);
    try {
        const { data, error } = await resend.emails.send({
            from: `${APP_NAME} <${FROM_EMAIL}>`,
            to: email,
            subject: `Reset your ${APP_NAME} password`,
            html: `<div style="background:#f5f7fb;padding:40px 20px;font-family:Inter,Segoe UI,sans-serif;">
            <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.08);">

            <div style="background:linear-gradient(135deg,#111827,#2563eb);padding:40px;text-align:center;">
             <h1 style="margin:0;color:#fff;font-size:30px;font-weight:800;">
              Avatar India
            </h1>
            <p style="margin-top:12px;color:#dbeafe;">
             AI Marketplace Platform
             </p>
            </div>

            <div style="padding:40px;">
            <h2 style="margin-top:0;color:#111827;">
             Reset Your Password
            </h2>

        <p style="font-size:15px;color:#4b5563;line-height:1.8;">
        We received a request to reset the password for your Avatar India account.
         </p>

        <p style="font-size:15px;color:#4b5563;line-height:1.8;">
        Click the button below to create a new password.
         </p>

        <div style="text-align:center;margin:40px 0;">
        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:16px 36px;
            background:#2563eb;
            color:#ffffff;
            text-decoration:none;
            border-radius:12px;
            font-weight:700;
            font-size:16px;
          "
        >
          Reset Password
        </a>
      </div>

      <div style="
        background:#eff6ff;
        border:1px solid #bfdbfe;
        border-radius:12px;
        padding:16px;
      ">
        <strong style="color:#1e40af;">
          Security Notice
        </strong>
        <p style="margin:8px 0 0;color:#1e3a8a;font-size:14px;">
          This password reset link will expire in 1 hour for your security.
        </p>
      </div>

      <p style="margin-top:28px;color:#6b7280;font-size:14px;">
        If the button doesn't work, copy and paste this URL into your browser:
      </p>

      <p style="
        background:#f3f4f6;
        padding:12px;
        border-radius:10px;
        word-break:break-all;
        font-size:13px;
      ">
        ${resetUrl}
      </p>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />

      <p style="color:#6b7280;font-size:13px;">
        If you didn't request a password reset, you can safely ignore this email.
        Your password will remain unchanged.
      </p>
    </div>

            <div style="
              background:#f9fafb;
              padding:20px;
              text-align:center;
            color:#6b7280;
            font-size:12px;
            " >
        © 2026 Avatar India. All rights reserved.
        </div>
        </div>
        </div> `,
        });

        if (error) {
            console.error(`[Resend Error] Error sending reset email to ${email}:`, error);
            throw error;
        }

        console.log(`[Resend Success] Reset email sent! ID: ${data?.id}`);
        return data;
    } catch (error: any) {
        if (error?.name === 'validation_error' || error?.message?.includes('verify a domain')) {
            const validationMessage = `Resend blocked email delivery. Verify SMTP_FROM_EMAIL (${FROM_EMAIL}) on Resend or use a verified domain.`;
            console.error(`[Resend Validation Error] ${validationMessage}`, error);
            throw new Error(validationMessage);
        }

        console.error(`Error sending reset email to ${email}:`, error);
        throw error;
    }
};

/**
 * Send Proposal Received Email via Resend
 */
export const sendProposalEmail = async (email: string, vendorName: string, toolName: string, dashboardUrl: string) => {
    console.log(`[Resend] Sending proposal email to: ${email}`);
    try {
        const { data, error } = await resend.emails.send({
            from: `${APP_NAME} <${FROM_EMAIL}>`,
            to: email,
            subject: `New Proposal from ${vendorName} for ${toolName}`,
            html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
                <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                    <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin-bottom: 12px; text-align: center;">New Proposal Received!</h2>
                    <p style="color: #64748b; font-size: 15px; line-height: 1.7; margin-bottom: 28px; text-align: center;">
                        <strong>${vendorName}</strong> has sent you a new proposal for <strong>${toolName}</strong>.
                    </p>
                    <a href="${dashboardUrl}" style="display: block; text-align: center; background: linear-gradient(135deg, #4f46e5, #6366f1); color: white; text-decoration: none; padding: 16px 32px; border-radius: 14px; font-weight: 700; font-size: 16px; margin-bottom: 24px;">
                        View Proposal →
                    </a>
                </div>
            </div>
            `,
        });

        if (error) {
            console.error(`[Resend Error] Error sending proposal email to ${email}:`, error);
            throw error;
        }

        console.log(`[Resend Success] Proposal email sent! ID: ${data?.id}`);
        return data;
    } catch (error) {
        console.error(`Error sending proposal email to ${email}:`, error);
        throw error;
    }
};

/**
 * Send Proposal Status Email via Resend
 */
export const sendProposalStatusEmail = async (email: string, customerName: string, toolName: string, status: string, dashboardUrl: string) => {
    console.log(`[Resend] Sending proposal status email to: ${email}`);
    try {
        const { data, error } = await resend.emails.send({
            from: `${APP_NAME} <${FROM_EMAIL}>`,
            to: email,
            subject: `Proposal ${status}: ${toolName}`,
            html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
                <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                    <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin-bottom: 12px; text-align: center;">Proposal ${status}</h2>
                    <p style="color: #64748b; font-size: 15px; line-height: 1.7; margin-bottom: 28px; text-align: center;">
                        <strong>${customerName}</strong> has <strong>${status.toLowerCase()}</strong> your proposal for <strong>${toolName}</strong>.
                    </p>
                    <a href="${dashboardUrl}" style="display: block; text-align: center; background: linear-gradient(135deg, #4f46e5, #6366f1); color: white; text-decoration: none; padding: 16px 32px; border-radius: 14px; font-weight: 700; font-size: 16px; margin-bottom: 24px;">
                        View Details →
                    </a>
                </div>
            </div>
            `,
        });

        if (error) {
            console.error(`[Resend Error] Error sending proposal status email to ${email}:`, error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error(`Error sending proposal status email to ${email}:`, error);
        throw error;
    }
};

/**
 * Send Demo Requested Email
 */
export const sendDemoRequestedEmail = async (email: string, customerName: string, scheduledAt: string, dashboardUrl: string) => {
    console.log(`[Resend] Sending demo requested email to: ${email}`);
    try {
        const { data, error } = await resend.emails.send({
            from: `${APP_NAME} <${FROM_EMAIL}>`,
            to: email,
            subject: `Demo Requested by ${customerName}`,
            html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
                <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                    <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin-bottom: 12px; text-align: center;">New Demo Request!</h2>
                    <p style="color: #64748b; font-size: 15px; line-height: 1.7; margin-bottom: 28px; text-align: center;">
                        <strong>${customerName}</strong> has requested to schedule a demo on <strong>${new Date(scheduledAt).toLocaleString()}</strong>.
                    </p>
                    <a href="${dashboardUrl}" style="display: block; text-align: center; background: linear-gradient(135deg, #4f46e5, #6366f1); color: white; text-decoration: none; padding: 16px 32px; border-radius: 14px; font-weight: 700; font-size: 16px; margin-bottom: 24px;">
                        Manage Request →
                    </a>
                </div>
            </div>
            `,
        });

        if (error) {
            console.error(`[Resend Error] Error sending demo requested email to ${email}:`, error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error(`Error sending demo requested email to ${email}:`, error);
        throw error;
    }
};

/**
 * Send Demo Status Update Email
 */
export const sendDemoStatusEmail = async (email: string, vendorName: string, status: string, scheduledAt: string, dashboardUrl: string, meetingLink?: string) => {
    console.log(`[Resend] Sending demo status email to: ${email}`);
    try {
        const { data, error } = await resend.emails.send({
            from: `${APP_NAME} <${FROM_EMAIL}>`,
            to: email,
            subject: `Demo ${status} by ${vendorName}`,
            html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
                <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                    <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin-bottom: 12px; text-align: center;">Demo ${status}</h2>
                    <p style="color: #64748b; font-size: 15px; line-height: 1.7; margin-bottom: 28px; text-align: center;">
                        Your demo with <strong>${vendorName}</strong> has been <strong>${status.toLowerCase()}</strong> for <strong>${new Date(scheduledAt).toLocaleString()}</strong>.
                    </p>
                    ${meetingLink ? `<p style="text-align: center; margin-bottom: 28px;"><a href="${meetingLink}" style="color: #4f46e5; text-decoration: none; font-weight: bold;">Join Meeting: ${meetingLink}</a></p>` : ''}
                    <a href="${dashboardUrl}" style="display: block; text-align: center; background: linear-gradient(135deg, #4f46e5, #6366f1); color: white; text-decoration: none; padding: 16px 32px; border-radius: 14px; font-weight: 700; font-size: 16px; margin-bottom: 24px;">
                        View Details →
                    </a>
                </div>
            </div>
            `,
        });

        if (error) {
            console.error(`[Resend Error] Error sending demo status email to ${email}:`, error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error(`Error sending demo status email to ${email}:`, error);
        throw error;
    }
};
