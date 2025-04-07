import { WalletsListComponent } from './../wallets-list/wallets-list.component';
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
import { LedgerTransaction } from '../../dto/Ledger-transaction.dto';
import {
  TransactionTypes,
  TransactionTypeLabels,
} from '../../enum/transaction-type';
import { ImportDialogComponent } from '../dialogs/import-transaction-dialog/import-transaction-dialog.component';
import { UpdateTransactionDialogComponent } from '../dialogs/update-transaction-dialog/update-transaction-dialog.component';

@Component({
  selector: 'app-ledger-transaction-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './ledger-transactions-list.component.html',
  styles: ``,
})
export class LedgerTransactionsComponent {
  resource: HttpResourceRef<LedgerTransaction[] | undefined>;
  walletId = signal<string>('');
  pageTitle = 'Ledger Transactions List';
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
    this.resource = this.service.GetLedgerTransaction(this.walletId);
  }
  // Resource signals
  transactions = computed(
    () => this.resource.value() ?? ([] as LedgerTransaction[])
  );
  error = computed(() => this.resource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Ledger'));
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

  openUpdateTransactionDialog() {
    const dialogRef = this.dialog.open(UpdateTransactionDialogComponent, {
      data: { type: 0 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New wallet added:', result); /*
          this.service.create().subscribe({
            next: (response) => {
              if (response) {
                this.resource.reload(); // Reload the resource to get the updated list of wallets

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
*/
        // Add logic to handle the new wallet addition
      }
    });
  }
  getTypeLabels(type: TransactionTypes): string {
    return TransactionTypeLabels[type] || 'Unknown Type';
  }
}
