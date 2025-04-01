import { Component, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletsService } from '../../services/wallets.service';
import { HttpErrorResponse, HttpResourceRef } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { setErrorMessage } from '../../utils/error-message';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WOSTransaction } from '../../dto/wos-transaction.dto';

@Component({
  selector: 'app-wos-transaction-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './wos-transactions-list.component.html',
})
export class WOSTransactionsComponent {
  resource: HttpResourceRef<WOSTransaction[] | undefined>;
  walletId = signal<string>('');
  pageTitle = 'WOS Transactions List';
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
    this.resource = this.service.GetWOSTransaction(this.walletId);
  }
  // Resource signals
  transactions = computed(
    () => this.resource.value() ?? ([] as WOSTransaction[])
  );
  error = computed(() => this.resource.error() as HttpErrorResponse);
  errorMessage = computed(() =>
    setErrorMessage(this.error(), 'Wallet of Satoshi')
  );
  isLoading = computed(() => this.resource.isLoading());
}
