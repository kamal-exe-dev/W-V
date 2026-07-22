const brandHeader = `
  <div style="background:#0F172A;padding:32px 40px;border-radius:16px 16px 0 0;">
    <span style="color:#fff;font-size:20px;font-weight:700;">Web<span style="color:#2563EB">&</span>Visuals</span>
  </div>
`

const wrap = (body: string) => `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#F8FAFC;padding:40px 20px;">
    <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
      ${brandHeader}
      <div style="padding:32px 40px;color:#0F172A;">
        ${body}
      </div>
      <div style="padding:20px 40px;color:#94A3B8;font-size:12px;border-top:1px solid #E2E8F0;">
        Web & Visuals · Bengaluru, India
      </div>
    </div>
  </div>
`

const buttonHtml = (href: string, label: string) => `
  <a href="${href}" style="display:inline-block;background:#2563EB;color:#fff;text-decoration:none;
    padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px;margin-top:16px;">${label}</a>
`

export function welcomeEmail({
  name, email, loginUrl, verifyUrl,
}: { name: string; email: string; loginUrl: string; verifyUrl: string }) {
  return {
    subject: 'Welcome to Web & Visuals — your client portal is ready',
    html: wrap(`
      <h2 style="margin:0 0 12px;">Welcome, ${name}!</h2>
      <p style="line-height:1.6;color:#334155;">
        Your Web & Visuals client portal account has been created. You can sign in with
        <strong>${email}</strong> and the password your account manager shared with you.
      </p>
      <p style="line-height:1.6;color:#334155;">First, please verify your email address:</p>
      ${buttonHtml(verifyUrl, 'Verify Email Address')}
      <p style="line-height:1.6;color:#64748B;font-size:13px;margin-top:24px;">
        Once verified, sign in any time at <a href="${loginUrl}" style="color:#2563EB;">${loginUrl}</a>.
      </p>
    `),
  }
}

export function passwordResetEmail({ resetUrl }: { resetUrl: string }) {
  return {
    subject: 'Reset your Web & Visuals password',
    html: wrap(`
      <h2 style="margin:0 0 12px;">Reset your password</h2>
      <p style="line-height:1.6;color:#334155;">
        We received a request to reset your password. This link expires in 1 hour.
        If you didn't request this, you can safely ignore this email.
      </p>
      ${buttonHtml(resetUrl, 'Reset Password')}
    `),
  }
}

export function accountActivatedEmail({ name, loginUrl }: { name: string; loginUrl: string }) {
  return {
    subject: 'Your Web & Visuals account is active',
    html: wrap(`
      <h2 style="margin:0 0 12px;">You're all set, ${name}</h2>
      <p style="line-height:1.6;color:#334155;">Your account has been activated and you can now sign in.</p>
      ${buttonHtml(loginUrl, 'Sign In')}
    `),
  }
}

export function accountDisabledEmail({ name }: { name: string }) {
  return {
    subject: 'Your Web & Visuals account has been disabled',
    html: wrap(`
      <h2 style="margin:0 0 12px;">Account disabled</h2>
      <p style="line-height:1.6;color:#334155;">
        Hi ${name}, your account access has been disabled by an administrator.
        If you believe this is a mistake, please reply to this email or contact your account manager.
      </p>
    `),
  }
}
