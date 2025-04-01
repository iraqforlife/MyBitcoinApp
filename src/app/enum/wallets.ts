export enum Wallets {
  Ledger = 0,
  Newton = 1,
  Shakepay = 2,
  Bitcoinwell = 3,
  Exodus = 4,
  Muun = 5,
}

export const WalletsLabels: { [key in Wallets]: string } = {
  [Wallets.Ledger]: 'Ledger',
  [Wallets.Newton]: 'Newton',
  [Wallets.Shakepay]: 'Shakepay',
  [Wallets.Bitcoinwell]: 'Bitcoinwell',
  [Wallets.Exodus]: 'Exodus',
  [Wallets.Muun]: 'Muun',
};
