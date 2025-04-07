export enum TransactionTypes {
  Buy = 0,
  Sent = 1,
  Gift = 2,
  Lost = 3,
  Income = 4,
  Transfer = 5,
  BuyTransfer = 6,
  TransferSell = 7,
  NotSet = 8,
}
export const TransactionTypeLabels: { [key in TransactionTypes]: string } = {
  [TransactionTypes.Buy]: 'Buy',
  [TransactionTypes.Sent]: 'Sent',
  [TransactionTypes.Gift]: 'Gift',
  [TransactionTypes.Lost]: 'Lost',
  [TransactionTypes.Income]: 'Income',
  [TransactionTypes.Transfer]: 'Transfer',
  [TransactionTypes.BuyTransfer]: 'Buy & Transfer',
  [TransactionTypes.TransferSell]: 'Transfer & Sell',
  [TransactionTypes.NotSet]: 'Not Set',
};
