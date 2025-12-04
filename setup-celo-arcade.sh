#!/bin/bash

echo "🎮 Setting up Celo Game Arcade..."

mkdir -p celo-arcade
cd celo-arcade

# Create directories
mkdir -p src/app src/components src/lib public/.well-known public/images

# package.json
cat > package.json << 'EOF'
{
  "name": "celo-game-arcade",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@farcaster/frame-sdk": "^0.0.26",
    "@tanstack/react-query": "^5.51.1",
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "viem": "^2.17.4",
    "wagmi": "^2.12.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6",
    "typescript": "^5"
  }
}
EOF

# next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: '/.well-known/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }, { key: 'Content-Type', value: 'application/json' }] }];
  },
};
module.exports = nextConfig;
EOF

# tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {} },
  plugins: [],
};
EOF

# postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
EOF

# vercel.json
cat > vercel.json << 'EOF'
{"headers":[{"source":"/.well-known/(.*)","headers":[{"key":"Access-Control-Allow-Origin","value":"*"},{"key":"Content-Type","value":"application/json"}]}]}
EOF

# .gitignore
cat > .gitignore << 'EOF'
node_modules/
.next/
.env*.local
.vercel
EOF

# globals.css
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { font-family: system-ui, sans-serif; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); min-height: 100vh; }
button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
button:active { transform: scale(0.95); }
EOF

# page.tsx
cat > src/app/page.tsx << 'EOF'
import GameArcade from '@/components/GameArcade';
export default function Home() { return <GameArcade />; }
EOF

# layout.tsx
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import './globals.css';
export const metadata: Metadata = { title: 'Celo Game Arcade', description: 'Play games and win CELO!' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /><meta name="theme-color" content="#0f0c29" /></head><body><Providers>{children}</Providers></body></html>);
}
EOF

# farcaster.json
cat > public/.well-known/farcaster.json << 'EOF'
{"accountAssociation":{"header":"eyJmaWQiOjAsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn0","payload":"eyJkb21haW4iOiJleGFtcGxlLmNvbSJ9","signature":"REPLACE_WITH_YOUR_SIGNATURE"},"frame":{"version":"1","name":"Celo Game Arcade","iconUrl":"https://example.com/icon.png","homeUrl":"https://example.com","splashImageUrl":"https://example.com/splash.png","splashBackgroundColor":"#0f0c29","subtitle":"Play & Win CELO!","description":"Play games and win the prize pool!","primaryCategory":"games","tags":["gaming","celo","blockchain"]}}
EOF

# contract.ts
cat > src/lib/contract.ts << 'EOF'
import { parseEther } from 'viem';
export const CONTRACT_ADDRESS = '0x5c70CB9F68a5bcB9284ccb237036b82A2C99D07F' as const;
export const ENTRY_FEE = parseEther('0.1');
export const GameType = { CAR_RACE: 0, SNAKE: 1, FLAPPY: 2, SPACE_SHOOTER: 3, PUZZLE: 4 } as const;
export const Difficulty = { EASY: 0, MEDIUM: 1, HARD: 2 } as const;
export const CONTRACT_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [{ name: 'player', type: 'address' }], name: 'checkAccess', outputs: [{ name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'claimPrizePool', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'depositToPlay', outputs: [], stateMutability: 'payable', type: 'function' },
  { inputs: [], name: 'getArcadeStats', outputs: [{ name: '_prizePool', type: 'uint256' }, { name: '_totalPlayers', type: 'uint256' }, { name: '_totalGamesPlayed', type: 'uint256' }, { name: '_season', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getLeaderboard', outputs: [{ components: [{ name: 'player', type: 'address' }, { name: 'totalScore', type: 'uint256' }], name: '', type: 'tuple[10]' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'player', type: 'address' }], name: 'getPlayerStats', outputs: [{ name: 'hasAccess', type: 'bool' }, { name: 'totalScore', type: 'uint256' }, { name: 'gamesPlayed', type: 'uint256' }, { name: 'lastPlayTime', type: 'uint256' }, { name: 'seasonJoined', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getPrizePool', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'gameType', type: 'uint8' }, { name: 'rawScore', type: 'uint256' }, { name: 'difficulty', type: 'uint8' }], name: 'submitScore', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'withdrawCreatorEarnings', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { stateMutability: 'payable', type: 'receive' },
] as const;
EOF

# Providers.tsx
cat > src/components/Providers.tsx << 'EOF'
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { useState, useEffect, type ReactNode } from 'react';
const config = createConfig({
  chains: [celo, celoAlfajores],
  transports: { [celo.id]: http('https://forno.celo.org'), [celoAlfajores.id]: http('https://alfajores-forno.celo-testnet.org') },
  connectors: [injected()],
});
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const init = async () => {
      try { const sdk = await import('@farcaster/frame-sdk').catch(() => null); if (sdk?.sdk) await sdk.sdk.actions.ready(); } catch {}
      setIsReady(true);
    };
    init();
  }, []);
  if (!isReady) return (<div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div><p style={{ color: '#00ff88', fontSize: '18px' }}>Loading...</p></div></div>);
  return (<WagmiProvider config={config}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></WagmiProvider>);
}
EOF

# GameArcade.tsx (main component with all games)
cat > src/components/GameArcade.tsx << 'GAMEEOF'
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI, GameType, Difficulty, ENTRY_FEE } from '@/lib/contract';

interface LeaderboardEntry { player: string; totalScore: bigint; }
interface GameInfo { id: string; name: string; icon: string; color: string; desc: string; gameType: number; }
interface DifficultyInfo { id: string; name: string; mult: string; color: string; desc: string; value: number; }

export default function GameArcade() {
  const [view, setView] = useState<string>('home');
  const [game, setGame] = useState<GameInfo | null>(null);
  const [diff, setDiff] = useState<string>('medium');
  const [showSelect, setShowSelect] = useState(false);
  const [lastScore, setLastScore] = useState<{ raw: number; final: number; diff: string } | null>(null);

  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const { data: prizePoolData } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'getPrizePool' });
  const { data: playerStatsData, refetch: refetchPlayerStats } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'getPlayerStats', args: address ? [address] : undefined });
  const { data: leaderboardData, refetch: refetchLeaderboard } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'getLeaderboard' });
  const { data: arcadeStatsData } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'getArcadeStats' });

  const prizePool = prizePoolData ? Number(formatEther(prizePoolData)) : 0;
  const hasAccess = playerStatsData?.[0] ?? false;
  const userTotalScore = playerStatsData?.[1] ? Number(playerStatsData[1]) : 0;
  const season = arcadeStatsData?.[3] ? Number(arcadeStatsData[3]) : 1;
  const totalPlayers = arcadeStatsData?.[1] ? Number(arcadeStatsData[1]) : 0;

  const leaderboard = leaderboardData ? ([...leaderboardData] as LeaderboardEntry[]).filter((e) => e.player !== '0x0000000000000000000000000000000000000000').map((e, i) => ({ rank: i + 1, addr: `${e.player.slice(0, 6)}...${e.player.slice(-4)}`, fullAddr: e.player, score: Number(e.totalScore), isYou: e.player.toLowerCase() === address?.toLowerCase() })) : [];
  const userRank = leaderboard.findIndex((e) => e.isYou) + 1 || '-';

  const diffs: DifficultyInfo[] = [
    { id: 'easy', name: 'Easy', mult: '1x', color: '#00ff88', desc: 'Slower pace', value: Difficulty.EASY },
    { id: 'medium', name: 'Medium', mult: '1.5x', color: '#ffd700', desc: 'Balanced', value: Difficulty.MEDIUM },
    { id: 'hard', name: 'Hard', mult: '2x', color: '#ff4444', desc: 'Max rewards!', value: Difficulty.HARD },
  ];

  const games: GameInfo[] = [
    { id: 'car', name: 'Turbo Racing', icon: '🏎️', color: '#00ff88', desc: 'Dodge & collect!', gameType: GameType.CAR_RACE },
    { id: 'snake', name: 'Neon Snake', icon: '🐍', color: '#ff6b6b', desc: 'Classic snake!', gameType: GameType.SNAKE },
    { id: 'flappy', name: 'Flappy Celo', icon: '🐦', color: '#ffd700', desc: 'Fly through pipes!', gameType: GameType.FLAPPY },
    { id: 'space', name: 'Space Blaster', icon: '🚀', color: '#9933ff', desc: 'Destroy aliens!', gameType: GameType.SPACE_SHOOTER },
  ];

  const handleDeposit = () => { writeContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'depositToPlay', value: ENTRY_FEE }); };

  const handleSubmitScore = async (rawScore: number, gameType: number, difficulty: number) => {
    try { writeContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'submitScore', args: [gameType, BigInt(rawScore), difficulty] }); } catch (e) { console.error(e); }
  };

  const handleEnd = (score: number) => {
    const diffInfo = diffs.find((d) => d.id === diff)!;
    const multiplier = diff === 'easy' ? 1 : diff === 'medium' ? 1.5 : 2;
    const final = Math.floor(score * multiplier);
    setLastScore({ raw: score, final, diff });
    if (hasAccess && game) handleSubmitScore(score, game.gameType, diffInfo.value);
    setView('result');
  };

  useEffect(() => { if (isSuccess) { refetchPlayerStats(); refetchLeaderboard(); } }, [isSuccess, refetchPlayerStats, refetchLeaderboard]);

  const handleClaimPrize = () => { writeContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'claimPrizePool' }); };
  const isTopPlayer = leaderboard[0]?.fullAddr?.toLowerCase() === address?.toLowerCase();

  // CAR GAME
  const CarGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
    const [state, setState] = useState('play');
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(diff === 'easy' ? 4 : diff === 'medium' ? 5 : 6);
    const [px, setPx] = useState(50);
    const [obs, setObs] = useState<any[]>([]);
    const [coins, setCoins] = useState<any[]>([]);
    const [road, setRoad] = useState(0);
    const [lives, setLives] = useState(diff === 'easy' ? 5 : diff === 'medium' ? 3 : 2);
    const ref = useRef<number | null>(null);
    const scoreRef = useRef(score);
    scoreRef.current = score;
    const colors = [{ c: '#ff6b6b', a: '#ee5a5a' }, { c: '#4ecdc4', a: '#3dbdb5' }, { c: '#ffe66d', a: '#efd55c' }];

    const loop = useCallback(() => {
      if (state !== 'play') return;
      setRoad((r) => (r + speed) % 40);
      setScore((s) => s + Math.floor(speed / 2));
      setSpeed((s) => Math.min(s + 0.003, diff === 'easy' ? 10 : diff === 'medium' ? 13 : 16));
      if (Math.random() < (diff === 'easy' ? 0.02 : diff === 'medium' ? 0.03 : 0.04)) {
        const lanes = [22, 38, 50, 62, 78];
        const col = colors[Math.floor(Math.random() * 3)];
        setObs((o) => [...o, { id: Date.now() + Math.random(), x: lanes[Math.floor(Math.random() * 5)], y: -15, ...col }]);
      }
      if (Math.random() < 0.02) {
        const lanes = [22, 38, 50, 62, 78];
        setCoins((c) => [...c, { id: Date.now(), x: lanes[Math.floor(Math.random() * 5)], y: -10 }]);
      }
      setObs((o) => o.map((i) => ({ ...i, y: i.y + speed * 0.8 })).filter((i) => i.y < 110));
      setCoins((c) => c.map((i) => ({ ...i, y: i.y + speed * 0.8 })).filter((i) => i.y < 110));
      ref.current = requestAnimationFrame(loop);
    }, [state, speed, diff]);

    useEffect(() => {
      if (state !== 'play') return;
      obs.forEach((o) => {
        if (o.y > 68 && o.y < 92 && Math.abs(px - o.x) < 10) {
          setLives((l) => { if (l - 1 <= 0) { setState('over'); onEnd(scoreRef.current); } return l - 1; });
          setObs((p) => p.filter((x) => x.id !== o.id));
        }
      });
      coins.forEach((c) => {
        if (c.y > 68 && c.y < 92 && Math.abs(px - c.x) < 8) { setCoins((p) => p.filter((x) => x.id !== c.id)); setScore((s) => s + 100); }
      });
    }, [obs, coins, px, state, onEnd]);

    useEffect(() => { if (state === 'play') ref.current = requestAnimationFrame(loop); return () => { if (ref.current) cancelAnimationFrame(ref.current); }; }, [state, loop]);

    useEffect(() => {
      const h = (e: KeyboardEvent) => {
        if (state !== 'play') return;
        if (e.key === 'ArrowLeft' || e.key === 'a') setPx((p) => Math.max(18, p - 5));
        if (e.key === 'ArrowRight' || e.key === 'd') setPx((p) => Math.min(82, p + 5));
      };
      window.addEventListener('keydown', h);
      return () => window.removeEventListener('keydown', h);
    }, [state]);

    const mv = (d: string) => setPx((p) => (d === 'l' ? Math.max(18, p - 8) : Math.min(82, p + 8)));
    const maxLives = diff === 'easy' ? 5 : diff === 'medium' ? 3 : 2;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '16px', fontSize: '13px' }}><span style={{ color: '#0f8' }}>SCORE:</span> <span style={{ color: '#fd0', fontWeight: 'bold' }}>{score.toLocaleString()}</span></div>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '16px', fontSize: '13px' }}><span style={{ color: '#f44' }}>LIVES:</span> {'❤️'.repeat(Math.max(0, lives))}{'🖤'.repeat(Math.max(0, maxLives - lives))}</div>
        </div>
        <div style={{ position: 'relative' }}>
          <svg width="280" height="420" viewBox="0 0 100 150" style={{ borderRadius: '14px', border: '3px solid rgba(0,255,136,0.5)', background: 'linear-gradient(#0a0a1a,#1a1a3e)' }}>
            <defs><linearGradient id="ng" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#0f8" /><stop offset="100%" stopColor="#0c6" /></linearGradient></defs>
            <rect x="12" y="0" width="76" height="150" fill="#1a1a2e" />
            <rect x="12" y="0" width="3" height="150" fill="url(#ng)" /><rect x="85" y="0" width="3" height="150" fill="url(#ng)" />
            {[...Array(8)].map((_, i) => (<g key={i}><rect x="30" y={((i * 22 + road) % 170)} width="2" height="12" fill="#fff" opacity="0.7" /><rect x="49" y={((i * 22 + road) % 170)} width="2" height="12" fill="#fff" opacity="0.7" /><rect x="68" y={((i * 22 + road) % 170)} width="2" height="12" fill="#fff" opacity="0.7" /></g>))}
            {coins.map((c) => (<g key={c.id} transform={`translate(${c.x},${c.y})`}><circle r="5" fill="#fd0" /><circle r="3.5" fill="#fa0" /><text y="2" textAnchor="middle" fill="#640" fontSize="5" fontWeight="bold">C</text></g>))}
            {obs.map((o) => (<g key={o.id} transform={`translate(${o.x},${o.y})`}><rect x="-7" y="-12" width="14" height="24" rx="4" fill={o.c} /></g>))}
            <g transform={`translate(${px},115)`}><rect x="-7" y="-12" width="14" height="24" rx="4" fill="#0f8" /><circle cx="-4" cy="-10" r="1.5" fill="#fff" /><circle cx="4" cy="-10" r="1.5" fill="#fff" /></g>
          </svg>
          {state === 'over' && (<div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: '48px' }}>💥</div><h2 style={{ color: '#f44', margin: '8px 0' }}>GAME OVER</h2><p style={{ color: '#fff' }}>Score: <span style={{ color: '#fd0' }}>{score.toLocaleString()}</span></p></div></div>)}
        </div>
        {state === 'play' && (<div style={{ display: 'flex', gap: '24px', marginTop: '12px' }}><button onMouseDown={() => mv('l')} onTouchStart={() => mv('l')} style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg,#0f8,#0a6)', borderRadius: '50%', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>←</button><button onMouseDown={() => mv('r')} onTouchStart={() => mv('r')} style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg,#0f8,#0a6)', borderRadius: '50%', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>→</button></div>)}
      </div>
    );
  };

  // SNAKE GAME
  const SnakeGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
    const sz = 18, cell = 14;
    const spd = diff === 'easy' ? 180 : diff === 'medium' ? 130 : 90;
    const [snake, setSnake] = useState([{ x: 9, y: 9 }]);
    const [food, setFood] = useState({ x: 14, y: 9 });
    const [dir, setDir] = useState({ x: 1, y: 0 });
    const [state, setState] = useState('play');
    const [score, setScore] = useState(0);
    const dirRef = useRef(dir);
    const scoreRef = useRef(score);
    scoreRef.current = score;

    useEffect(() => {
      if (state !== 'play') return;
      const int = setInterval(() => {
        setSnake((prev) => {
          const h = { x: prev[0].x + dirRef.current.x, y: prev[0].y + dirRef.current.y };
          if (h.x < 0 || h.x >= sz || h.y < 0 || h.y >= sz || prev.some((s) => s.x === h.x && s.y === h.y)) { setState('over'); onEnd(scoreRef.current); return prev; }
          const ns = [h, ...prev];
          if (h.x === food.x && h.y === food.y) {
            let nf: { x: number; y: number };
            do { nf = { x: Math.floor(Math.random() * sz), y: Math.floor(Math.random() * sz) }; } while (ns.some((s) => s.x === nf.x && s.y === nf.y));
            setFood(nf); setScore((s) => s + 50); return ns;
          }
          ns.pop(); return ns;
        });
      }, spd);
      return () => clearInterval(int);
    }, [state, food, onEnd, spd]);

    useEffect(() => {
      const h = (e: KeyboardEvent) => {
        if (state !== 'play') return;
        const ds: { [key: string]: { x: number; y: number } } = { ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 } };
        const nd = ds[e.key];
        if (nd && !(dirRef.current.x === -nd.x && dirRef.current.y === -nd.y)) { dirRef.current = nd; setDir(nd); }
      };
      window.addEventListener('keydown', h);
      return () => window.removeEventListener('keydown', h);
    }, [state]);

    const chDir = (nd: { x: number; y: number }) => { if (!(dirRef.current.x === -nd.x && dirRef.current.y === -nd.y)) { dirRef.current = nd; setDir(nd); } };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '16px', fontSize: '13px' }}><span style={{ color: '#f66' }}>SCORE:</span> <span style={{ color: '#fd0', fontWeight: 'bold' }}>{score}</span></div>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '16px', fontSize: '13px' }}><span style={{ color: '#f66' }}>LENGTH:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>{snake.length}</span></div>
        </div>
        <div style={{ position: 'relative' }}>
          <svg width={sz * cell} height={sz * cell} style={{ borderRadius: '12px', border: '3px solid #f66', background: '#1a1a2e' }}>
            {snake.map((s, i) => (<rect key={i} x={s.x * cell + 1} y={s.y * cell + 1} width={cell - 2} height={cell - 2} rx="3" fill={i === 0 ? '#f66' : `rgba(255,107,107,${1 - i * 0.04})`} />))}
            <circle cx={food.x * cell + cell / 2} cy={food.y * cell + cell / 2} r={cell / 2 - 2} fill="#fd0" />
          </svg>
          {state === 'over' && (<div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: '48px' }}>🐍</div><h2 style={{ color: '#f66', margin: '8px 0' }}>GAME OVER</h2><p style={{ color: '#fff' }}>Score: <span style={{ color: '#fd0' }}>{score}</span></p></div></div>)}
        </div>
        {state === 'play' && (<div style={{ marginTop: '12px' }}><div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}><button onClick={() => chDir({ x: 0, y: -1 })} style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg,#f66,#e55)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>↑</button></div><div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}><button onClick={() => chDir({ x: -1, y: 0 })} style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg,#f66,#e55)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>←</button><button onClick={() => chDir({ x: 0, y: 1 })} style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg,#f66,#e55)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>↓</button><button onClick={() => chDir({ x: 1, y: 0 })} style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg,#f66,#e55)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>→</button></div></div>)}
      </div>
    );
  };

  // FLAPPY GAME
  const FlappyGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
    const [by, setBy] = useState(50);
    const [vel, setVel] = useState(0);
    const [pipes, setPipes] = useState<any[]>([]);
    const [state, setState] = useState('play');
    const [score, setScore] = useState(0);
    const ref = useRef<number | null>(null);
    const velRef = useRef(vel), byRef = useRef(by), scoreRef = useRef(score);
    velRef.current = vel; byRef.current = by; scoreRef.current = score;

    const grav = diff === 'easy' ? 0.3 : diff === 'medium' ? 0.4 : 0.5;
    const gap = diff === 'easy' ? 35 : diff === 'medium' ? 30 : 25;
    const pSpd = diff === 'easy' ? 1.5 : diff === 'medium' ? 2 : 2.5;

    const jump = () => { if (state === 'play') setVel(-6); };

    useEffect(() => {
      if (state !== 'play') return;
      const loop = () => {
        setVel((v) => v + grav);
        setBy((y) => { const ny = y + velRef.current; if (ny < 0 || ny > 95) { setState('over'); onEnd(scoreRef.current); } return Math.max(0, Math.min(95, ny)); });
        setPipes((prev) => {
          let np = prev.map((p) => ({ ...p, x: p.x - pSpd })).filter((p) => p.x > -15);
          if (prev.length === 0 || prev[prev.length - 1].x < 60) np.push({ x: 100, gapY: 20 + Math.random() * 40, passed: false });
          np.forEach((p) => {
            if (p.x < 25 && p.x > 10 && (byRef.current < p.gapY || byRef.current > p.gapY + gap)) { setState('over'); onEnd(scoreRef.current); }
            if (!p.passed && p.x < 15) { p.passed = true; setScore((s) => s + 10); }
          });
          return np;
        });
        ref.current = requestAnimationFrame(loop);
      };
      ref.current = requestAnimationFrame(loop);
      return () => { if (ref.current) cancelAnimationFrame(ref.current); };
    }, [state, grav, gap, pSpd, onEnd]);

    useEffect(() => { const h = (e: KeyboardEvent) => { if (e.code === 'Space') jump(); }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, [state]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px' }}>
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', marginBottom: '8px' }}><span style={{ color: '#fd0' }}>SCORE:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>{score}</span></div>
        <div style={{ position: 'relative' }} onClick={jump} onTouchStart={jump}>
          <svg width="280" height="350" viewBox="0 0 100 125" style={{ borderRadius: '12px', border: '3px solid #fd0', background: 'linear-gradient(#1a1a3e,#0f0c29)' }}>
            {pipes.map((p, i) => (<g key={i}><rect x={p.x} y="0" width="10" height={p.gapY} fill="#0f8" rx="2" /><rect x={p.x} y={p.gapY + gap} width="10" height={125 - p.gapY - gap} fill="#0f8" rx="2" /></g>))}
            <circle cx="20" cy={by} r="5" fill="#fd0" /><circle cx="22" cy={by - 1} r="1.5" fill="#000" /><polygon points={`25,${by} 30,${by - 2} 30,${by + 2}`} fill="#f80" />
          </svg>
          {state === 'over' && (<div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: '48px' }}>🐦</div><h2 style={{ color: '#fd0', margin: '8px 0' }}>GAME OVER</h2><p style={{ color: '#fff' }}>Score: <span style={{ color: '#fd0' }}>{score}</span></p></div></div>)}
        </div>
        <p style={{ color: '#888', fontSize: '12px', marginTop: '8px' }}>Tap or SPACE to fly!</p>
      </div>
    );
  };

  // SPACE BLASTER (FIXED!)
  const SpaceGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
    const [sx, setSx] = useState(50);
    const [bullets, setBullets] = useState<any[]>([]);
    const [enemies, setEnemies] = useState<any[]>([]);
    const [state, setState] = useState('play');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(diff === 'easy' ? 5 : diff === 'medium' ? 3 : 2);
    const ref = useRef<number | null>(null);
    const sxRef = useRef(sx), scoreRef = useRef(score), livesRef = useRef(lives), stateRef = useRef(state);
    sxRef.current = sx; scoreRef.current = score; livesRef.current = lives; stateRef.current = state;

    const eSpd = diff === 'easy' ? 0.5 : diff === 'medium' ? 0.8 : 1.2;
    const spawnR = diff === 'easy' ? 0.02 : diff === 'medium' ? 0.03 : 0.04;
    const maxLives = diff === 'easy' ? 5 : diff === 'medium' ? 3 : 2;

    const shoot = useCallback(() => { if (stateRef.current === 'play') setBullets((b) => [...b, { x: sxRef.current, y: 85, id: Date.now() + Math.random() }]); }, []);

    useEffect(() => {
      if (state !== 'play') return;
      const loop = () => {
        if (stateRef.current !== 'play') return;
        if (Math.random() < spawnR) setEnemies((e) => [...e, { x: 10 + Math.random() * 80, y: -5, id: Date.now() + Math.random() }]);
        setBullets((b) => b.map((i) => ({ ...i, y: i.y - 3 })).filter((i) => i.y > -5));
        setEnemies((prev) => {
          const updated = prev.map((e) => ({ ...e, y: e.y + eSpd }));
          updated.forEach((e) => { if (e.y > 95) setLives((l) => { const nl = l - 1; if (nl <= 0) { setState('over'); onEnd(scoreRef.current); } return nl; }); });
          return updated.filter((e) => e.y <= 95);
        });
        setBullets((prevB) => {
          const remB = [...prevB];
          setEnemies((prevE) => {
            const remE: any[] = [];
            prevE.forEach((en) => {
              const hit = remB.findIndex((b) => Math.abs(b.x - en.x) < 8 && Math.abs(b.y - en.y) < 8);
              if (hit !== -1) { remB.splice(hit, 1); setScore((s) => s + 25); } else remE.push(en);
            });
            return remE;
          });
          return remB;
        });
        ref.current = requestAnimationFrame(loop);
      };
      ref.current = requestAnimationFrame(loop);
      return () => { if (ref.current) cancelAnimationFrame(ref.current); };
    }, [state, eSpd, spawnR, onEnd]);

    useEffect(() => {
      const h = (e: KeyboardEvent) => {
        if (stateRef.current !== 'play') return;
        if (e.key === 'ArrowLeft' || e.key === 'a') setSx((x) => Math.max(10, x - 5));
        if (e.key === 'ArrowRight' || e.key === 'd') setSx((x) => Math.min(90, x + 5));
        if (e.code === 'Space') shoot();
      };
      window.addEventListener('keydown', h);
      return () => window.removeEventListener('keydown', h);
    }, [shoot]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '16px', fontSize: '13px' }}><span style={{ color: '#93f' }}>SCORE:</span> <span style={{ color: '#fd0', fontWeight: 'bold' }}>{score}</span></div>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '16px', fontSize: '13px' }}><span style={{ color: '#f44' }}>LIVES:</span> {'❤️'.repeat(Math.max(0, lives))}{'🖤'.repeat(Math.max(0, maxLives - lives))}</div>
        </div>
        <div style={{ position: 'relative' }}>
          <svg width="280" height="350" viewBox="0 0 100 125" style={{ borderRadius: '12px', border: '3px solid #93f', background: 'linear-gradient(#0a0a1a,#1a1a3e)' }}>
            {[...Array(20)].map((_, i) => (<circle key={i} cx={(i * 23) % 100} cy={(i * 17) % 125} r={0.5} fill="#fff" opacity={0.4} />))}
            {bullets.map((b) => (<rect key={b.id} x={b.x - 1} y={b.y} width="2" height="8" fill="#0f8" rx="1" />))}
            {enemies.map((e) => (<g key={e.id} transform={`translate(${e.x},${e.y})`}><polygon points="0,-5 -5,5 5,5" fill="#f44" /><circle r="3" fill="#f66" /></g>))}
            <g transform={`translate(${sx},90)`}><polygon points="0,-8 -6,6 6,6" fill="#93f" /><polygon points="0,-5 -4,4 4,4" fill="#b6f" /><rect x="-2" y="4" width="4" height="4" fill="#f80" /></g>
          </svg>
          {state === 'over' && (<div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: '48px' }}>🚀</div><h2 style={{ color: '#93f', margin: '8px 0' }}>GAME OVER</h2><p style={{ color: '#fff' }}>Score: <span style={{ color: '#fd0' }}>{score}</span></p></div></div>)}
        </div>
        {state === 'play' && (<div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}><button onMouseDown={() => setSx((x) => Math.max(10, x - 8))} onTouchStart={() => setSx((x) => Math.max(10, x - 8))} style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg,#93f,#72c)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>←</button><button onClick={shoot} onTouchStart={shoot} style={{ width: '70px', height: '50px', background: 'linear-gradient(135deg,#f44,#c22)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>🔥 FIRE</button><button onMouseDown={() => setSx((x) => Math.min(90, x + 8))} onTouchStart={() => setSx((x) => Math.min(90, x + 8))} style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg,#93f,#72c)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>→</button></div>)}
      </div>
    );
  };

  // HOME
  const Home = () => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', padding: '14px', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div><h1 style={{ fontSize: '24px', fontWeight: '900', background: 'linear-gradient(90deg,#0f8,#fd0,#f66,#93f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>🎮 CELO ARCADE</h1><p style={{ color: '#888', fontSize: '11px', margin: '2px 0 0' }}>Play • Compete • Win CELO!</p></div>
        {isConnected ? (<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><div style={{ background: 'rgba(0,255,136,0.2)', padding: '6px 10px', borderRadius: '16px', border: '1px solid #0f8' }}><span style={{ color: '#0f8', fontSize: '11px' }}>🟢 {address?.slice(0, 6)}...{address?.slice(-4)}</span></div><button onClick={() => disconnect()} style={{ background: 'rgba(255,68,68,0.2)', border: '1px solid #f44', borderRadius: '16px', padding: '6px 10px', color: '#f44', fontSize: '11px', cursor: 'pointer' }}>Disconnect</button></div>) : (<button onClick={() => connect({ connector: connectors[0] })} style={{ background: 'linear-gradient(135deg,#0f8,#0a6)', border: 'none', borderRadius: '16px', padding: '10px 16px', color: '#fff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>Connect Wallet</button>)}
      </div>
      <div style={{ background: 'linear-gradient(135deg,rgba(255,215,0,0.2),rgba(255,136,0,0.2))', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '2px solid rgba(255,215,0,0.3)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-15px', right: '-15px', fontSize: '60px', opacity: '0.1' }}>🏆</div>
        <p style={{ color: '#fd0', fontSize: '12px', margin: '0 0 4px', fontWeight: '600' }}>💰 PRIZE POOL</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}><span style={{ fontSize: '36px', fontWeight: '900', color: '#fff' }}>{prizePool.toFixed(3)}</span><span style={{ fontSize: '18px', color: '#fd0', fontWeight: '600' }}>CELO</span></div>
        <p style={{ color: '#aaa', fontSize: '11px', margin: '6px 0 0' }}>🥇 #1 player claims ALL! Season {season}</p>
        {isTopPlayer && prizePool > 0 && (<button onClick={handleClaimPrize} disabled={isPending || isConfirming} style={{ marginTop: '10px', background: 'linear-gradient(135deg,#fd0,#f80)', border: 'none', borderRadius: '12px', padding: '10px 20px', color: '#000', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>{isPending || isConfirming ? 'Claiming...' : '🏆 Claim Prize!'}</button>)}
      </div>
      {isConnected && (hasAccess ? (<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}><div style={{ background: 'rgba(0,255,136,0.1)', borderRadius: '14px', padding: '12px', border: '1px solid rgba(0,255,136,0.3)' }}><p style={{ color: '#0f8', fontSize: '11px', margin: '0 0 2px' }}>YOUR SCORE</p><p style={{ color: '#fff', fontSize: '20px', fontWeight: '800', margin: 0 }}>{userTotalScore.toLocaleString()}</p></div><div style={{ background: 'rgba(153,51,255,0.1)', borderRadius: '14px', padding: '12px', border: '1px solid rgba(153,51,255,0.3)' }}><p style={{ color: '#93f', fontSize: '11px', margin: '0 0 2px' }}>YOUR RANK</p><p style={{ color: '#fff', fontSize: '20px', fontWeight: '800', margin: 0 }}>#{userRank} {userRank === 1 ? '👑' : userRank === 2 ? '🥈' : userRank === 3 ? '🥉' : '🎮'}</p></div></div>) : (<div style={{ background: 'linear-gradient(135deg,rgba(0,255,136,0.2),rgba(0,200,100,0.1))', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '1px solid rgba(0,255,136,0.3)', textAlign: 'center' }}><p style={{ color: '#fff', fontSize: '14px', margin: '0 0 10px' }}>💎 Deposit <strong style={{ color: '#fd0' }}>0.1 CELO</strong> to play all games!</p><p style={{ color: '#888', fontSize: '11px', margin: '0 0 12px' }}>20% Creator Fee • 80% goes to Prize Pool</p><button onClick={handleDeposit} disabled={isPending || isConfirming} style={{ background: 'linear-gradient(135deg,#0f8,#0a6)', border: 'none', borderRadius: '14px', padding: '12px 24px', color: '#fff', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,255,136,0.3)' }}>{isPending || isConfirming ? 'Processing...' : '🚀 Deposit & Play'}</button></div>))}
      {!isConnected && (<div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}><p style={{ color: '#888', fontSize: '14px', margin: 0 }}>Connect your wallet to start playing!</p></div>)}
      <div style={{ marginBottom: '16px' }}><h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', margin: '0 0 10px' }}>🎯 Choose Your Game</h2><div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>{games.map((g) => (<button key={g.id} onClick={() => { if (!isConnected) { alert('Please connect your wallet first!'); return; } if (!hasAccess) { alert('Please deposit 0.1 CELO to play!'); return; } setGame(g); setShowSelect(true); }} style={{ background: `linear-gradient(135deg,${g.color}22,${g.color}11)`, borderRadius: '14px', padding: '12px', border: `1px solid ${g.color}44`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', opacity: hasAccess ? 1 : 0.6 }}><div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `linear-gradient(135deg,${g.color},${g.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: `0 6px 15px ${g.color}44` }}>{g.icon}</div><div style={{ flex: 1 }}><h3 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', margin: '0 0 2px' }}>{g.name}</h3><p style={{ color: '#888', fontSize: '11px', margin: 0 }}>{g.desc}</p></div><div style={{ color: g.color, fontSize: '20px' }}>▶</div></button>))}</div></div>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '14px' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}><h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', margin: 0 }}>🏆 Leaderboard</h2><span style={{ color: '#888', fontSize: '11px' }}>{totalPlayers} players</span></div>{leaderboard.length > 0 ? leaderboard.slice(0, 5).map((e, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '8px', marginBottom: '6px', background: e.isYou ? 'rgba(0,255,136,0.15)' : 'transparent', border: e.isYou ? '1px solid rgba(0,255,136,0.3)' : '1px solid transparent' }}><span style={{ fontSize: '18px', marginRight: '10px' }}>{e.rank === 1 ? '👑' : e.rank === 2 ? '🥈' : e.rank === 3 ? '🥉' : '🎮'}</span><span style={{ color: e.isYou ? '#0f8' : '#fff', flex: 1, fontSize: '13px', fontWeight: e.isYou ? '700' : '400' }}>{e.addr} {e.isYou && '(You)'}</span><span style={{ color: '#fd0', fontWeight: '700', fontSize: '13px' }}>{e.score.toLocaleString()}</span></div>)) : (<p style={{ color: '#888', fontSize: '13px', textAlign: 'center', margin: '20px 0' }}>No players yet. Be the first!</p>)}</div>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '10px', marginTop: '14px' }}>💚 Powered by Celo • Entry: 0.1 CELO</p>
    </div>
  );

  // MODAL
  const Modal = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px' }}>
      <div style={{ background: 'linear-gradient(135deg,#1a1a3e,#0f0c29)', borderRadius: '20px', padding: '20px', maxWidth: '320px', width: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}><div style={{ width: '70px', height: '70px', borderRadius: '16px', background: `linear-gradient(135deg,${game?.color},${game?.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 10px', boxShadow: `0 8px 25px ${game?.color}44` }}>{game?.icon}</div><h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 4px' }}>{game?.name}</h2><p style={{ color: '#888', fontSize: '12px', margin: 0 }}>{game?.desc}</p></div>
        <div style={{ marginBottom: '16px' }}><p style={{ color: '#fff', fontSize: '13px', fontWeight: '600', marginBottom: '10px', textAlign: 'center' }}>⚡ Select Difficulty</p><div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>{diffs.map((d) => (<button key={d.id} onClick={() => setDiff(d.id)} style={{ background: diff === d.id ? `linear-gradient(135deg,${d.color}33,${d.color}11)` : 'rgba(255,255,255,0.05)', border: diff === d.id ? `2px solid ${d.color}` : '2px solid transparent', borderRadius: '12px', padding: '12px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color, boxShadow: diff === d.id ? `0 0 12px ${d.color}` : 'none' }} /><div style={{ textAlign: 'left' }}><p style={{ color: '#fff', fontSize: '14px', fontWeight: '700', margin: 0 }}>{d.name}</p><p style={{ color: '#888', fontSize: '10px', margin: '1px 0 0' }}>{d.desc}</p></div></div><div style={{ background: d.color, color: '#000', padding: '3px 8px', borderRadius: '16px', fontSize: '12px', fontWeight: '800' }}>{d.mult}</div></button>))}</div></div>
        <div style={{ background: 'rgba(255,215,0,0.1)', borderRadius: '10px', padding: '10px', marginBottom: '16px', border: '1px solid rgba(255,215,0,0.2)' }}><p style={{ color: '#fd0', fontSize: '11px', margin: 0, textAlign: 'center' }}>💡 1000 pts × {diff === 'easy' ? '1x' : diff === 'medium' ? '1.5x' : '2x'} = <strong>{diff === 'easy' ? '1,000' : diff === 'medium' ? '1,500' : '2,000'}</strong> final</p></div>
        <div style={{ display: 'flex', gap: '10px' }}><button onClick={() => setShowSelect(false)} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button><button onClick={() => { setShowSelect(false); setView('game'); }} style={{ flex: 2, padding: '12px', background: `linear-gradient(135deg,${game?.color},${game?.color}cc)`, border: 'none', borderRadius: '12px', color: '#000', fontSize: '14px', fontWeight: '800', cursor: 'pointer', boxShadow: `0 6px 20px ${game?.color}44` }}>🎮 START</button></div>
      </div>
    </div>
  );

  // GAME VIEW
  const GameView = () => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: '10px' }}><button onClick={() => setView('home')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '14px', cursor: 'pointer' }}>← Exit</button><span style={{ fontSize: '22px' }}>{game?.icon}</span><span style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>{game?.name}</span></div>
      {game?.id === 'car' && <CarGame onEnd={handleEnd} />}
      {game?.id === 'snake' && <SnakeGame onEnd={handleEnd} />}
      {game?.id === 'flappy' && <FlappyGame onEnd={handleEnd} />}
      {game?.id === 'space' && <SpaceGame onEnd={handleEnd} />}
    </div>
  );

  // RESULT VIEW
  const Result = () => {
    const dc = lastScore?.diff === 'easy' ? '#0f8' : lastScore?.diff === 'medium' ? '#fd0' : '#f44';
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', padding: '14px', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '28px', maxWidth: '320px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '12px' }}>{game?.icon}</div>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', margin: '0 0 6px' }}>Game Complete!</h2>
          <p style={{ color: game?.color, fontSize: '14px', margin: '0 0 20px' }}>{game?.name}</p>
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span style={{ color: '#888' }}>Raw Score</span><span style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>{lastScore?.raw.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span style={{ color: '#888' }}>Difficulty</span><span style={{ color: dc, fontWeight: '700' }}>{lastScore?.diff?.toUpperCase()} ({lastScore?.diff === 'easy' ? '1x' : lastScore?.diff === 'medium' ? '1.5x' : '2x'})</span></div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#fd0', fontWeight: '600' }}>Final Score</span><span style={{ color: '#fd0', fontSize: '24px', fontWeight: '900' }}>{lastScore?.final.toLocaleString()}</span></div>
          </div>
          <div style={{ background: isSuccess ? 'rgba(0,255,136,0.1)' : 'rgba(255,215,0,0.1)', borderRadius: '10px', padding: '10px', marginBottom: '20px', border: `1px solid ${isSuccess ? 'rgba(0,255,136,0.3)' : 'rgba(255,215,0,0.3)'}` }}><p style={{ color: isSuccess ? '#0f8' : '#fd0', margin: 0, fontSize: '13px' }}>{isPending || isConfirming ? '⏳ Submitting score...' : isSuccess ? '✅ Score submitted!' : '📝 Score recorded'}</p></div>
          <div style={{ display: 'flex', gap: '10px' }}><button onClick={() => setView('game')} style={{ flex: 1, padding: '12px', background: `linear-gradient(135deg,${game?.color},${game?.color}cc)`, border: 'none', borderRadius: '12px', color: '#000', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>🔄 Again</button><button onClick={() => setView('home')} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>🏠 Home</button></div>
        </div>
      </div>
    );
  };

  return (<>{view === 'home' && <Home />}{view === 'game' && <GameView />}{view === 'result' && <Result />}{showSelect && <Modal />}</>);
}
GAMEEOF

echo ""
echo "✅ All files created!"
echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎮 Setup complete! Now run:"
echo "   cd celo-arcade"
echo "   npm run dev"
echo ""
echo "📋 Contract: 0x5c70CB9F68a5bcB9284ccb237036b82A2C99D07F"
echo "🌐 After testing, deploy with: npx vercel --prod"
