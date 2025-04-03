export interface LedgerTransction {
  id: string | undefined;
  type: number;
  fiatAmout: number;
  btcAmout: number;
  fiatFee: number;
  btcFee: number;
  btcPriceAtTransaction: number;
  date: Date;
  description: string;
  fromBtcAdress: string;
  toBtcAdress: string;
  fromTransactionId: string | undefined;
  toTransactionId: string | undefined;
}
