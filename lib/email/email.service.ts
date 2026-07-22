interface SendEmailInput {
  to: string
  subject: string
  html: string
}

/**
 * Sends via Resend when RESEND_API_KEY is configured. Otherwise logs the
 * email to the console so auth flows (invite, reset password, etc.) remain
 * fully testable without a real email provider wired up yet.
 */
export const emailService = {
  async send({ to, subject, html }: SendEmailInput): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.log('\n[email:stub] ---------------------------------')
      console.log(`[email:stub] To: ${to}`)
      console.log(`[email:stub] Subject: ${subject}`)
      console.log('[email:stub] Set RESEND_API_KEY in .env to send this for real.')
      console.log('[email:stub] -----------------------------------\n')
      return
    }

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    const from = process.env.EMAIL_FROM ?? 'Web & Visuals <onboarding@resend.dev>'

    await resend.emails.send({ from, to, subject, html })
  },
}
