import { WalletTypes } from '../enum/wallets';

export interface NewtonTransaction {
  id: string;
  type: WalletTypes;
  walletId: string;
  date: Date;
  amount: number;
  fee: number;
  categorized: boolean;
  ledgerId: string | null;
  // specific
  newtonType: string;
  receivedQuantity: number;
  receivedCurrency: string;
  sentQuantity: number;
  sentCurrency: string;
}
