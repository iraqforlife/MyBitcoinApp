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
import { ImportDialogComponent } from '../dialogs/import-transaction-dialog/import-transaction-dialog.component';

@Component({
  selector: 'app-bitcoinwell-transaction-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './bitcoinwell-transactions-list.component.html',
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

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const file = result as File;

        this.service.import(this.walletId(), file).subscribe({
          next: (response) => {
            if (response) {
              this.resource.reload();
              this.snackBar.open('Wallet added successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
              });
            } else {
              this.snackBar.open('Sum thin wong 2', 'Close', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
              });
            }
          },
          error: (err) => {
            this.snackBar.open('Sum thin wong ', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });
          },
        });
        // Add logic to handle the new wallet addition
      }
    });
  }
}
