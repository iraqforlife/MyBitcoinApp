import { Wallets } from '../enum/wallets';

export interface Wallet {
  id: string | undefined;
  name: string;
  userId: string | undefined;
  type: number;
}
