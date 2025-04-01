import { WalletTypes } from '../enum/wallets';

export interface WOSTransaction {
  id: string;
  type: WalletTypes;
  walletId: string;
  date: Date;
  amount: number;
  fee: number;
  categorized: boolean;
  ledgerId: string | null;
  // specific
  utcDate: string;
  currency: string;
  address: string;
  description: string;
  pointOfSale: boolean;
  btcAmmount: number;
}
