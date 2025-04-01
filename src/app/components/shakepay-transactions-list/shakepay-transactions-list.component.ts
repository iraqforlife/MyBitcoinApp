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
import { ShakepayTransaction } from '../../dto/shakepay-transaction.dto';
import {
  TransactionType,
  TransactionTypeLabels,
} from '../../enum/transaction-type';
import { ImportDialogComponent } from '../dialogs/import-transaction-dialog/import-transaction-dialog.component';

@Component({
  selector: 'app-shakepay-transaction-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './shakepay-transactions-list.component.html',
})
export class ShakepayTransactionsComponent {
  resource: HttpResourceRef<ShakepayTransaction[] | undefined>;
  walletId = signal<string>('');
  pageTitle = 'Shakepay Transactions List';
  displayedColumns: string[] = ['date', 'amount', 'type', 'fee', 'actions'];
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
    this.resource = this.service.GetShakepayTransaction(this.walletId);
  }
  // Resource signals
  transactions = computed(
    () => this.resource.value() ?? ([] as ShakepayTransaction[])
  );
  error = computed(() => this.resource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Shakepay'));
  isLoading = computed(() => this.resource.isLoading());
  getTypeLabels(type: TransactionType): string {
    return TransactionTypeLabels[type] || 'Unknown Type';
  }
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
