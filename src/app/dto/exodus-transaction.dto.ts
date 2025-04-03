import { WalletTypes } from '../enum/wallets';

export interface ExodusTransaction {
  id: string;
  type: WalletTypes;
  walletId: string;
  date: Date;
  amount: number;
  fee: number;
  categorized: boolean;
  ledgerId: string | null;
  // specific
  exodusType: string;
  fromPortfolio: string;
  toPortfolio: string;
  outAmount: number;
  outCurrency: string;
  feeAmount: number;
  feeCurrency: string;
  toAddress: string;
  outTxId: string;
  outTxUrl: string;
  inAmount: number;
  inCurrency: string;
  inTxId: string;
  inTxUrl: string;
  orderId: string;
  personalNote: string;
}
