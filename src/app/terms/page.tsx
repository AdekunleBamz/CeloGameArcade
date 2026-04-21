import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Celo Game Arcade',
};

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
  color: '#fff',
  padding: '24px 16px 48px',
  fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
};

const cardStyle: React.CSSProperties = {
  maxWidth: 760,
  margin: '0 auto',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 16,
  padding: 20,
  lineHeight: 1.6,
};

export default function TermsPage() {
  return (
    <main style={pageStyle}>
      <article style={cardStyle}>
        <h1 style={{ marginTop: 0 }}>Terms of Service</h1>
        <p>Effective date: April 2, 2026</p>
        <p>
          By using Celo Game Arcade, you agree to these terms. If you do not agree, do not use the service.
        </p>
        <h2>Non-Custodial Use</h2>
        <p>
          Celo Game Arcade is non-custodial. You are fully responsible for your wallet, private keys, and transaction
          approvals.
        </p>
        <h2>Onchain Transactions</h2>
        <p>
          Gameplay actions may require onchain transactions and network fees. Blockchain transactions are generally
          irreversible.
        </p>
        <h2>No Financial Advice</h2>
        <p>
          Celo Game Arcade provides game functionality and does not provide financial, legal, or tax advice.
        </p>
        <h2>Liability</h2>
        <p>
          The app is provided on an “as is” basis. To the maximum extent permitted by law, we are not liable for
          losses resulting from wallet misuse, network issues, third-party failures, or user error.
        </p>
        <h2>Contact</h2>
        <p>
          For terms inquiries, contact{' '}
          <a href="mailto:bamzzstudio@gmail.com" style={{ color: '#9df' }}>
            bamzzstudio@gmail.com
          </a>
          .
        </p>
      </article>
    </main>
  );
}
