declare module '@farcaster/miniapp-sdk' {
  export const sdk: {
    isInMiniApp: () => Promise<boolean>;
    actions: {
      ready: () => Promise<void>;
    };
  };
}
