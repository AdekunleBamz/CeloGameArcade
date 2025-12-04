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
