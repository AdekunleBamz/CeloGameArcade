import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Celo Game Arcade',
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

export default function PrivacyPage() {
  return (
    <main style={pageStyle}>
      <article style={cardStyle}>
        <h1 style={{ marginTop: 0 }}>Privacy Policy</h1>
        <p>Effective date: April 2, 2026</p>
        <p>
          Celo Arcade is a non-custodial MiniApp. We do not hold user funds or private keys. Wallet actions are
          executed through your connected wallet (for example MiniPay).
        </p>
        <h2>What We Collect</h2>
        <p>
          We may process your public wallet address and onchain activity required to operate gameplay and leaderboard
          features. We may also use basic analytics and server logs for performance and security.
        </p>
        <h2>How We Use Data</h2>
        <p>
          Data is used to provide game access, leaderboard ranking, prize-pool logic, error monitoring, and abuse
          prevention.
        </p>
        <h2>Third Parties</h2>
        <p>
          Your usage may involve third-party services such as wallet providers, blockchain RPC endpoints, block
          explorers, and hosting infrastructure.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy questions, contact us at{' '}
          <a href="mailto:bamzzstudio@gmail.com" style={{ color: '#9df' }}>
            bamzzstudio@gmail.com
          </a>
          .
        </p>
      </article>
    </main>
  );
}
