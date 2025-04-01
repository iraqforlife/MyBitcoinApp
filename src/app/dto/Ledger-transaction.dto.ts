import { WalletTypes } from '../enum/wallets';

export interface LedgerTransaction {
  id: string;
  type: WalletTypes;
  walletId: string;
  date: Date;
  amount: number;
  fee: number;
  categorized: boolean;
  ledgerId: string | null;
  // specific
  operationDate: string;
  status: string;
  currencyTicker: string;
  operationType: string;
  operationAmount: number;
  operationFees: number;
  operationHash: string;
  accountName: string;
  accountXpub: string;
  countervalueTicker: string;
  countervalueAtOperationDate: number;
  countervalueAtCsvExport: number;
}
