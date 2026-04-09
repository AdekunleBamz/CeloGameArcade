import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support | Celo Game Arcade',
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

export default function SupportPage() {
  return (
    <main style={pageStyle}>
      <article style={cardStyle}>
        <h1 style={{ marginTop: 0 }}>Support</h1>
        <p>Need help with Celo Arcade? Reach us through any of the channels below.</p>
        <ul>
          <li>
            Email:{' '}
            <a href="mailto:bamzzstudio@gmail.com" style={{ color: '#9df' }}>
              bamzzstudio@gmail.com
            </a>
          </li>
          <li>
            X (Twitter):{' '}
            <a href="https://x.com/CeloDevs" target="_blank" rel="noreferrer" style={{ color: '#9df' }}>
              https://x.com/CeloDevs
            </a>
          </li>
          <li>
            Telegram:{' '}
            <a href="https://t.me/proofofship" target="_blank" rel="noreferrer" style={{ color: '#9df' }}>
              https://t.me/proofofship
            </a>
          </li>
        </ul>
        <p>
          When contacting support, include your wallet address, device type, and a short description of the issue for
          faster help.
        </p>
      </article>
    </main>
  );
}
