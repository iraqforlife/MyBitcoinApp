export enum TransactionType {
  Buy = 0,
  Sent = 1,
  Gift = 2,
  Lost = 3,
  Income = 4,
  Transfer = 5,
  NotSet = 6,
}
export const TransactionTypeLabels: { [key in TransactionType]: string } = {
  [TransactionType.Buy]: 'Buy',
  [TransactionType.Sent]: 'Sent',
  [TransactionType.Gift]: 'Gift',
  [TransactionType.Lost]: 'Lost',
  [TransactionType.Income]: 'Income',
  [TransactionType.Transfer]: 'Transfer',
  [TransactionType.NotSet]: 'Not Set',
};
