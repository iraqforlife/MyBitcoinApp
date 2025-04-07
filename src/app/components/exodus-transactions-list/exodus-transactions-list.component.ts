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
import { ImportDialogComponent } from '../dialogs/import-transaction-dialog/import-transaction-dialog.component';
import {
  TransactionTypes,
  TransactionTypeLabels,
} from '../../enum/transaction-type';
import { ExodusTransaction } from '../../dto/exodus-transaction.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exodus-transaction-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './exodus-transactions-list.component.html',
})
export class ExodusTransactionsComponent {
  resource: HttpResourceRef<ExodusTransaction[] | undefined>;
  walletId = signal<string>('');
  pageTitle = 'Exodus Transactions List';
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
    this.resource = this.service.getExodusTransactions(this.walletId);
  }
  // Resource signals
  transactions = computed(
    () => this.resource.value() ?? ([] as ExodusTransaction[])
  );
  error = computed(() => this.resource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Exodus'));
  isLoading = computed(() => this.resource.isLoading());

  getTypeLabels(type: TransactionTypes): string {
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
