import { httpResource, HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { UserService } from './user.service';
import { Wallet } from '../dto/wallet.dto';
import { BitcoinwellTransaction } from '../dto/bitcoinwell-transaction.dto';
import { LedgerTransaction } from '../dto/Ledger-transaction.dto';
import { NewtonTransaction } from '../dto/newton-transaction.dto';
import { ShakepayTransaction } from '../dto/shakepay-transaction.dto';
import { WOSTransaction } from '../dto/wos-transaction.dto';

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
  import(walletId: string, file: File) {
    // Create FormData to send the file
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`importer/${walletId}`, formData);
  }

  getBitcoinwellTransactions(walletId: Signal<string>) {
    return httpResource<BitcoinwellTransaction[]>(
      `wallets/GetBitcoinWellTransaction/${walletId()}`
    );
  }
  GetLedgerTransaction(walletId: Signal<string>) {
    return httpResource<LedgerTransaction[]>(
      `wallets/GetLedgerTransaction/${walletId()}`
    );
  }
  GetShakepayTransaction(walletId: Signal<string>) {
    return httpResource<ShakepayTransaction[]>(
      `wallets/GetShakepayTransaction/${walletId()}`
    );
  }
  GetNewtonTransaction(walletId: Signal<string>) {
    return httpResource<NewtonTransaction[]>(
      `wallets/GetNewtonTransaction/${walletId()}`
    );
  }
  GetWOSTransaction(walletId: Signal<string>) {
    return httpResource<WOSTransaction[]>(
      `wallets/GetWOSTransaction/${walletId()}`
    );
  }
}
