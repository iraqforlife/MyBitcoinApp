import { Wallets } from '../enum/wallets';

export interface BitcoinwellTransaction {
  id: string;
  type: Wallets;
  walletId: string;
  date: Date;
  amount: number;
  fee: number;
  categorized: boolean;
  ledgerId: string | null;
  transactionId: string;
  orderType: string;
  network: string;
  orderStatus: string;
  orderDate: string;
  fiatAmount: number;
  fiatCode: string;
  cryptoAmount: number;
  cryptoCode: string;
  minerFee: string;
  rate: string;
  receivingAddress: string;
  bitcoinWellDepositAddress: string;
  transactionHash: string;
  failReason: string;
}
