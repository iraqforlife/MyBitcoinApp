export enum WalletTypes {
  Ledger = 0,
  Newton = 1,
  Shakepay = 2,
  Bitcoinwell = 3,
  Exodus = 4,
  Muun = 5,
  WOS = 6,
}

export const WalletsLabels: { [key in WalletTypes]: string } = {
  [WalletTypes.Ledger]: 'Ledger',
  [WalletTypes.Newton]: 'Newton',
  [WalletTypes.Shakepay]: 'Shakepay',
  [WalletTypes.Bitcoinwell]: 'Bitcoinwell',
  [WalletTypes.Exodus]: 'Exodus',
  [WalletTypes.Muun]: 'Muun',
  [WalletTypes.WOS]: 'Wallet Of Satoshi',
};
