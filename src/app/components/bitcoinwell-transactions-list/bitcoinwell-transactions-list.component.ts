import { Component, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletsService } from '../../services/wallets.service';
import { HttpErrorResponse, HttpResourceRef } from '@angular/common/http';
import { BitcoinwellTransaction } from '../../dto/bitcoinwell-transaction.dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { setErrorMessage } from '../../utils/error-message';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bitcoinwell-transaction-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './bitcoinwell-transactions-list.component.html',
  styles: ``,
})
export class BitcoinwellTransactionsComponent {
  resource: HttpResourceRef<BitcoinwellTransaction[] | undefined>;
  walletId = signal<string>('');
  pageTitle = 'Bitcoinwell Transactions List';
  displayedColumns: string[] = ['id', 'amount', 'date', 'status', 'actions'];
  constructor(
    private route: ActivatedRoute,
    private service: WalletsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.route.paramMap.subscribe((params) => {
      const walletId = params.get('walletId');
      if (walletId) {
        this.walletId.set(walletId);
      }
    });
    this.resource = this.service.getBitcoinwellTransactions(this.walletId);
  }
  // Resource signals
  transactions = computed(
    () => this.resource.value() ?? ([] as BitcoinwellTransaction[])
  );
  error = computed(() => this.resource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Bitcoinwallet'));
  isLoading = computed(() => this.resource.isLoading());
}
