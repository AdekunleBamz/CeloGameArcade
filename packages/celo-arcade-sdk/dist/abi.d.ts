export declare const CONTRACT_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "usdmTokenAddress";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "initialEntryFee";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "player";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "deposited";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "toPrizePool";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "season";
        readonly type: "uint256";
    }];
    readonly name: "AccessGranted";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "owner";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "CreatorWithdraw";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly name: "oldFee";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "newFee";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "updatedBy";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "timestamp";
        readonly type: "uint256";
    }];
    readonly name: "EntryFeeUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "player";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "rank";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "totalScore";
        readonly type: "uint256";
    }];
    readonly name: "LeaderboardUpdated";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "CLAIM_COOLDOWN";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "ENTRY_FEE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "MAX_DIFFICULTY";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "MAX_ENTRY_FEE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "MAX_GAME_TYPE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "MIN_ENTRY_FEE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "canClaimPrize";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "player";
        readonly type: "address";
    }];
    readonly name: "checkAccess";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "creatorEarnings";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "entryFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getArcadeStats";
    readonly outputs: readonly [{
        readonly name: "_prizePool";
        readonly type: "uint256";
    }, {
        readonly name: "_totalPlayers";
        readonly type: "uint256";
    }, {
        readonly name: "_totalGamesPlayed";
        readonly type: "uint256";
    }, {
        readonly name: "_season";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getCurrentSeason";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getLeaderboard";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly name: "player";
            readonly type: "address";
        }, {
            readonly name: "totalScore";
            readonly type: "uint256";
        }];
        readonly name: "";
        readonly type: "tuple[10]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "difficulty";
        readonly type: "uint8";
    }];
    readonly name: "getMultiplier";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "player";
        readonly type: "address";
    }];
    readonly name: "getPlayerStats";
    readonly outputs: readonly [{
        readonly name: "hasAccess";
        readonly type: "bool";
    }, {
        readonly name: "totalScore";
        readonly type: "uint256";
    }, {
        readonly name: "gamesPlayed";
        readonly type: "uint256";
    }, {
        readonly name: "lastPlayTime";
        readonly type: "uint256";
    }, {
        readonly name: "seasonJoined";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getPrizePool";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getTimeUntilNextClaim";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getTopPlayer";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "lastClaimTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "prizePool";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "seasonNumber";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "seasonStartTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "totalGamesPlayed";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "totalPlayers";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "usdmToken";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "claimPrizePool";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "depositToPlay";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "newEntryFee";
        readonly type: "uint256";
    }];
    readonly name: "setEntryFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "gameType";
        readonly type: "uint8";
    }, {
        readonly name: "rawScore";
        readonly type: "uint256";
    }, {
        readonly name: "difficulty";
        readonly type: "uint8";
    }];
    readonly name: "submitScore";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "withdrawCreatorEarnings";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
export type ContractAbi = typeof CONTRACT_ABI;
