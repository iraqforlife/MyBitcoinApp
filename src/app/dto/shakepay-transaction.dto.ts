import { WalletTypes } from '../enum/wallets';

export interface ShakepayTransaction {
  id: string;
  type: WalletTypes;
  walletId: string;
  date: Date;
  amount: number;
  fee: number;
  categorized: boolean;
  ledgerId: string | null;
  // specific
  amountDebited: number;
  assetDebited: string;
  amountCredited: number;
  assetCredited: string;
  marketValue: number;
  marketValueCurrency: string;
  bookCost: number;
  bookCostCurrency: string;
  shakepayType: string;
  spotRate: number;
  buySellRate: string;
  description: string;
}
