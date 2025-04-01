import { httpResource, HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { UserService } from './user.service';
import { Wallet } from '../dto/wallet.dto';
import { BitcoinwellTransaction } from '../dto/bitcoinwell-transaction.dto';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {}
  getAll() {
    return httpResource<Wallet[]>(
      `wallets/getUserWallets/${this.userService.userId}`
    );
  }
  create(wallet: Wallet) {
    return this.httpClient.post<Wallet>('wallets', wallet);
  }
  getBitcoinwellTransactions(walletId: Signal<string>) {
    return httpResource<BitcoinwellTransaction[]>(
      `wallets/GetBitcoinWellTransaction/${walletId()}`
    );
  }
}
