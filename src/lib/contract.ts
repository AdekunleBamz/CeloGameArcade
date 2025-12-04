import { parseEther } from 'viem';

export const CONTRACT_ADDRESS = '0x1CBa04d94F78973BC9d9Ba5E05E65Bb66285EE15' as const;

export const ENTRY_FEE = parseEther('0.1');

export const GameType = {
  CAR_RACE: 0,
  SNAKE: 1,
  FLAPPY: 2,
  SPACE_SHOOTER: 3,
  PUZZLE: 4,
} as const;

export const Difficulty = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
} as const;

export const CONTRACT_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { anonymous: false, inputs: [{ indexed: true, name: 'player', type: 'address' }, { indexed: false, name: 'deposited', type: 'uint256' }, { indexed: false, name: 'toPrizePool', type: 'uint256' }, { indexed: false, name: 'season', type: 'uint256' }], name: 'AccessGranted', type: 'event' },
  { anonymous: false, inputs: [{ indexed: true, name: 'owner', type: 'address' }, { indexed: false, name: 'amount', type: 'uint256' }], name: 'CreatorWithdraw', type: 'event' },
  { anonymous: false, inputs: [{ indexed: true, name: 'player', type: 'address' }, { indexed: false, name: 'gameType', type: 'uint8' }, { indexed: false, name: 'difficulty', type: 'uint8' }, { indexed: false, name: 'rawScore', type: 'uint256' }, { indexed: false, name: 'finalScore', type: 'uint256' }, { indexed: false, name: 'newTotalScore', type: 'uint256' }], name: 'GamePlayed', type: 'event' },
  { anonymous: false, inputs: [{ indexed: true, name: 'player', type: 'address' }, { indexed: false, name: 'rank', type: 'uint256' }, { indexed: false, name: 'totalScore', type: 'uint256' }], name: 'LeaderboardUpdated', type: 'event' },
  { anonymous: false, inputs: [{ indexed: false, name: 'season', type: 'uint256' }, { indexed: false, name: 'timestamp', type: 'uint256' }], name: 'NewSeasonStarted', type: 'event' },
  { anonymous: false, inputs: [{ indexed: true, name: 'winner', type: 'address' }, { indexed: false, name: 'amount', type: 'uint256' }, { indexed: false, name: 'season', type: 'uint256' }], name: 'PrizePoolClaimed', type: 'event' },
  { inputs: [{ name: 'player', type: 'address' }], name: 'checkAccess', outputs: [{ name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'claimPrizePool', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'creatorEarnings', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'depositToPlay', outputs: [], stateMutability: 'payable', type: 'function' },
  { inputs: [{ name: 'player', type: 'address' }], name: 'getAllPlayerGameScores', outputs: [{ name: 'scores', type: 'uint256[5]' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getArcadeStats', outputs: [{ name: '_prizePool', type: 'uint256' }, { name: '_totalPlayers', type: 'uint256' }, { name: '_totalGamesPlayed', type: 'uint256' }, { name: '_season', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getCurrentSeason', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getLeaderboard', outputs: [{ components: [{ name: 'player', type: 'address' }, { name: 'totalScore', type: 'uint256' }], name: '', type: 'tuple[10]' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'difficulty', type: 'uint8' }], name: 'getMultiplier', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'pure', type: 'function' },
  { inputs: [{ name: 'player', type: 'address' }, { name: 'gameType', type: 'uint8' }], name: 'getPlayerGameScore', outputs: [{ name: 'score', type: 'uint256' }, { name: 'difficulty', type: 'uint8' }, { name: 'timestamp', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'player', type: 'address' }], name: 'getPlayerStats', outputs: [{ name: 'hasAccess', type: 'bool' }, { name: 'totalScore', type: 'uint256' }, { name: 'gamesPlayed', type: 'uint256' }, { name: 'lastPlayTime', type: 'uint256' }, { name: 'seasonJoined', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getPrizePool', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getTopPlayer', outputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getTimeUntilNextClaim', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'canClaimPrize', outputs: [{ name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'lastClaimTime', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: '', type: 'uint256' }], name: 'leaderboard', outputs: [{ name: 'player', type: 'address' }, { name: 'totalScore', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: '', type: 'address' }], name: 'players', outputs: [{ name: 'hasAccess', type: 'bool' }, { name: 'totalScore', type: 'uint256' }, { name: 'gamesPlayed', type: 'uint256' }, { name: 'lastPlayTime', type: 'uint256' }, { name: 'seasonJoined', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'prizePool', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'seasonNumber', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'seasonStartTime', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'gameType', type: 'uint8' }, { name: 'rawScore', type: 'uint256' }, { name: 'difficulty', type: 'uint8' }], name: 'submitScore', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'totalGamesPlayed', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalPlayers', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: 'newOwner', type: 'address' }], name: 'transferOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'withdrawCreatorEarnings', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { stateMutability: 'payable', type: 'receive' },
] as const;